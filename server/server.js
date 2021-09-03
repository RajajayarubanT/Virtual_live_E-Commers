const express = require("express");
const app = express();
const { PORT, MONGOURI } = require("./config/key");
const mongoose = require("mongoose");
const http = require("http");
const bodyParser = require("body-parser");
const server = http.createServer(app);
const cors = require("cors");
var corsOptions = {
  origin: "http://localhost:3000",
  optionsSuccessStatus: 200, // For legacy browser support
};

app.use(cors(corsOptions));
const router = express.Router();
// const { MongoClient } = require("mongodb");
// const client = new MongoClient(MONGOURI);

// async function run() {
//   try {
//     await client.connect();
//     const db = client.db("SCHOOL");
//     const employee = db.collection("employee_users");
//     const estimate = await employee.estimatedDocumentCount();
//     // find the storage statistics for the "sample_mflix" database using the 'dbStats' command
//     const result = await db.command({
//       dbStats: 1,
//     });

//     db.collection("employee_users").find({}).toArray(function (err, result) {
//       if (err) throw err;
//       console.log(result);

//     });

//   } finally {
//     await client.close();
//   }
// }
// run().catch(console.dir);

const {
  addUser,
  removeUser,
  getUser,
  getUsersInRoom,
} = require("./router/roomUsers");
const {
  addPurchaseOrderUser,
  removePurchaseOrderUser,
  getPurchaseOrderUser,
  getPurchaseOrderUsersInRoom,
} = require("./router/PurchasedOrderRoom");
//MongoDB connection
mongoose.connect(
  MONGOURI,
  {
    useNewUrlParser: true,
    useFindAndModify: true,
    useUnifiedTopology: true,
    findOneAndUpdate: true,
    findOneAndDelete: true,
  },
  (err) => {
    if (!err) {
      console.log("MongoDB Connection Succeeded.");
    } else {
      console.log("Error in DB connection : " + err);
    }
  }
);
//SCHEMAS
require("./models/user");
require("./models/admin");
require("./models/employee");
require("./models/studentAuthModel");
require("./models/post");
require("./models/accouts.model");
require("./models/customerOrderData");
require("./models/PostPurchasedOrderData");
require("./models/DynamicUserData");
//middlewares
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(require("./router/auth"));
app.use(require("./router/customer"));
app.use(require("./router/admin_Auth"));
app.use(require("./router/employee_Auth"));
app.use(require("./router/studentsAuth"));
app.use(require("./router/post"));
app.use(require("./router/user"));
app.use(require("./router/accounts"));
app.use(require("./router/attendance"));
app.use(require("./router/DynamicData_Admin"));

app.use("/payment", require("./router/paymentportal"));

// Video_Calling Route
const io = require("socket.io")(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
  socket.emit("mee", socket.id);

  socket.on("callEnd", (data) => {
    io.to(data.id).emit("callEnded", { id: data.id });
  });

  socket.on("callUser", (data) => {
    io.to(data.userToCall).emit("callUser", {
      signal: data.signalData,
      from: data.from,
      name: data.name,
    });
  });
  socket.on("coustomerId", ({ data, userId }) => {
    const user = getUser(userId);
    if (user) {
      io.to(user.room).emit("customerCallReq", { data });
    }
  });

  socket.on("answerCall", (data) => {
    io.to(data.to).emit("callAccepted", data.signal);
  });

  // ROOM
  socket.on("join", ({ name, room, userId }) => {
    const { error, user } = addUser({ id: userId, name, room });

    // if (error) return callback(error);

    socket.join(user.room);

    // socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.` });
    // socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

    io.to(user.room).emit("roomData", {
      room: user.room,
      users: getUsersInRoom(user.room),
    });
  });

  // socket.on('sendMessage', (message, callback) => {
  //   const userId = "abcdefghijk"
  //   const user = getUser(userId);

  //   io.to(user.room).emit('message', { user: user.name, text: message });

  //   callback();
  // });
  socket.on("orderRequest", (orderRequestData) => {
    const userId = orderRequestData.userId;
    const user = getUser(userId);
    io.to(user.room).emit("message", { user: userId, text: orderRequestData });
  });

  socket.on("disconnect", () => {
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit("message", {
        user: "Admin",
        text: `${user.name} has left.`,
      });
      io.to(user.room).emit("roomData", {
        room: user.room,
        users: getUsersInRoom(user.room),
      });
    }
  });

  // PurchasedOrder Room
  // ROOM
  // socket.on('joinPurchasedOrderRoom', ({ Customer, Employee, room }) => {

  //   if (Customer) {
  //     const { CustomerId, CustomerName } = Customer
  //     const { error, user } = addUser({ id: CustomerId, name: CustomerName, room });
  //     socket.join(user.room);
  //   }

  //   if (Employee) {
  //     const { EmployeeId, EmployeeName } = Employee
  //     const { error, user } = addUser({ id: EmployeeId, name: EmployeeName, room });
  //     socket.join(user.room);

  //   }
  // })
  // socket.on('joinPurchasedOrderRoom', ({ Customer, Employee, room }) => {

  //   if (Customer) {
  //     const { CustomerId, CustomerName } = Customer
  //     const { error, user } = addPurchaseOrderUser({ id: CustomerId, name: CustomerName, room });
  //     socket.join(user.room);
  //     io.to(user.room).emit('roomData', { room: user.room, users: getPurchaseOrderUsersInRoom(user.room) });
  //     console.log(getPurchaseOrderUsersInRoom(user.room))
  //   }

  //   if (Employee) {
  //     const { EmployeeId, EmployeeName } = Employee
  //     const { error, user } = addPurchaseOrderUser({ id: EmployeeId, name: EmployeeName, room });
  //     socket.join(user.room);
  //     io.to(user.room).emit('roomData', { room: user.room, users: getPurchaseOrderUsersInRoom(user.room) });

  //     console.log(getPurchaseOrderUsersInRoom(user.room))
  //   }

  //   // if (error) return callback(error);

  //   // socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.` });
  //   // socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

  //   // io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

  // });

  socket.on("PurchasedOrder", (PurchasedOrder_Customer) => {
    const CustomerID = PurchasedOrder_Customer.CustomerID;
    const user = getUser(CustomerID);
    console.log(PurchasedOrder_Customer);
    var room = "purchasedOrderRoom";
    console.log(user);
    io.to(user.room).emit("PurchasedOrder_Customer", {
      PurchasedOrderData: PurchasedOrder_Customer,
    });
    // console.log(PurchasedOrder_Customer)
  });
});

//PORT
server.listen(PORT, (err) => {
  if (err) {
    console.log("Server Error" + err);
  } else {
    console.log("Server in running on port: " + PORT);
  }
});
