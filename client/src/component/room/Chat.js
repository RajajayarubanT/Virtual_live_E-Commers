import React, { useState, useEffect } from "react";
import queryString from "query-string";
import io from "socket.io-client";
import { Link } from "react-router-dom";
import PaymentOrderList from "../users/PaymentNotification";

const socket = io.connect("http://localhost:4000");

const Chat = ({ location }) => {
  const [name, setName] = useState("");
  const [room, setRoom] = useState("");
  const [users, setUsers] = useState("");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState("");
  const [sendedUser, setSendedUser] = useState("");

  const [userName, setUserName] = useState("");
  const [gender, setGender] = useState("");
  const [deportament, setDeportament] = useState("");
  const [brand, setBrand] = useState("");
  const [price, setPrice] = useState("");
  const [size, setSize] = useState("");
  const [material, setmaterial] = useState("");
  const [color, setColor] = useState("");
  const [notes, setNotes] = useState("");
  const [PurchasedOrderList, setPurchasedOrderList] = useState({});

  useEffect(() => {
    // const { name, room } = queryString.parse(location.search);
    const name = localStorage.getItem("name");
    const room = localStorage.getItem("room");

    setRoom(room);
    setName(name);

    const userId = localStorage.getItem("id");
    socket.emit("join", { name, room, userId });
  }, []);

  useEffect(() => {
    socket.on("message", (message) => {
      console.log(message);
      if (message) {
        setMessages(message.text);
        setSendedUser(message.user);
        // userDetails
        setUserName(message.text.Name);
        setGender(message.text.Gender);
        setDeportament(message.text.Dept);
        setBrand(message.text.Brand);
        setPrice(message.text.Price);
        setSize(message.text.Size);
        setmaterial(message.text.Material);
        setColor(message.text.Color);
        setNotes(message.text.Notes);
      }
    });
    socket.on("PurchasedOrder_Customer", (PurchasedOrderData) => {
      setPurchasedOrderList(PurchasedOrderData);
    });
    socket.on("customerCallReq", ({ data }) => {
      if (data) {
        localStorage.setItem("customerToCall", data);
      }
    });

    socket.on("roomData", ({ users }) => {
      setUsers(users);
    });
  }, []);

  const destroy_OrderDetails = () => {
    const employeeOther_Content = document.getElementById(
      "Order-Notificaion-Container-main"
    );
    employeeOther_Content.style.display = "none";
    localStorage.setItem("userToCall", sendedUser);
    localStorage.setItem("customerName", userName);
  };

  const orderNotifiContent = () => {
    const EMPLOYEE = localStorage.getItem("employee");
    if (EMPLOYEE) {
      if (sendedUser) {
        const employeeOther_Content = document.getElementById(
          "employee_main_content"
        );
        employeeOther_Content.style.display = "none";
        return (
          <div
            className="Order-Notificaion-Container-main"
            id="Order-Notificaion-Container-main"
          >
            <div class="a_wrapper">
              <div class="title">User Order Details</div>
              <div class="form form-section-container-main">
                <div className="form-section-container">
                  <div className="form-section1">
                    <div class="inputfield Order-InputField_style">
                      <label>Name</label>
                      <p className="Order-Input-Value Order-InputField_style">
                        <strong>{userName}</strong>
                      </p>
                    </div>

                    <div class="inputfield">
                      <label>Gender</label>
                      <p className="Order-Input-Value Order-InputField_style">
                        <strong>{gender}</strong>
                      </p>
                    </div>
                  </div>
                  <div className="form-section2">
                    <div class="inputfield">
                      <label>Department</label>
                      <p className="Order-Input-Value Order-InputField_style">
                        <strong>{deportament}</strong>
                      </p>
                    </div>
                    <div class="inputfield">
                      <label>Brand</label>
                      <p className="Order-Input-Value Order-InputField_style">
                        <strong>{brand}</strong>
                      </p>
                    </div>
                    <div class="inputfield">
                      <label>Price</label>
                      <p className="Order-Input-Value Order-InputField_style">
                        <strong>{price}</strong>
                      </p>
                    </div>
                    <div class="inputfield">
                      <label>Size</label>
                      <p className="Order-Input-Value Order-InputField_style">
                        <strong>{size}</strong>
                      </p>
                    </div>
                    <div class="inputfield">
                      <label>Material</label>
                      <p className="Order-Input-Value Order-InputField_style">
                        <strong>{material}</strong>
                      </p>
                    </div>
                    <div class="inputfield">
                      <label>Color</label>
                      <p className="Order-Input-Value Order-InputField_style">
                        <strong>{color}</strong>
                      </p>
                    </div>
                    <div class="inputfield">
                      <label>Notes</label>
                      <p className="Order-Input-Value Order-InputField_style Order-Input-Value-textarea  textarea">
                        <strong>{notes}</strong>
                      </p>
                    </div>
                  </div>
                </div>

                <div className="UserRequestBtn">
                  <a href="/video">
                    <button
                      style={{ width: "180px", marginTop: "20px" }}
                      class="banner__button"
                      onClick={destroy_OrderDetails}
                      type="submit"
                    >
                      Call User
                    </button>
                  </a>
                </div>
              </div>
            </div>
          </div>
        );
      }
    }
    if (PurchasedOrderList.PurchasedOrderData) {
      let IDD = PurchasedOrderList.PurchasedOrderData.CustomerID;
      console.log(IDD);
      const PayemtListID = localStorage.getItem("id");
      if (IDD == PayemtListID) {
        const UserMainContent = document.getElementsByClassName(
          "videScreen-main-Container"
        )[0];

        return <PaymentOrderList OrderedData={PurchasedOrderList} />;
      }
    }
  };

  return (
    <div className="outerContainer">
      <div className="container">
        {users.name}
        {orderNotifiContent()}
      </div>
      <div></div>
    </div>
  );
};

export default Chat;
