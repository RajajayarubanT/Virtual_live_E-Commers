import React, { useEffect, createContext, useReducer, useContext } from "react";
import { BrowserRouter, Route, Switch, useHistory } from "react-router-dom";
import { reducer, initialState } from "./reducers/userReducer";

// Room
import JoinRoom from "./component/room/Join";
import Chat from "./component/room/Chat";

import Sample from "./component/Sample";

// Pages
import Admin from "./component/Admin/admin";
import AdminMainContent from "./component/Admin/adminMainContent";
import User from "./component/employee";

// Login System
import Login from "./component/login";
import UserOrderRequest from "./component/users/userOrderRequest";
import PaymentNotification from "./component/users/PaymentNotification";
import PaymentPortal from "./component/users/PaymentPortal";

// Admin
import Admin_Login from "./component/Admin/adminLogin";
import AddUsers from "./component/Admin/addUsers";
import DynamicUpload from "./component/Admin/DynamicUpload";

// Employee
import Employee_Login from "./component/employee/employeeLogin";
import Employee from "./component/employee/employee";
import PurchasedOrder from "./component/employee/PurchasedOrder";

// Video Calling
import VideoCalling from "./component/videoCalling/videCalling";
import VideoCallSCreen from "./component/videoCalling/videCallScreen";

export const Usercontext = createContext();

const Routing = () => {
  const history = useHistory();
  const { state, dispatch } = useContext(Usercontext);
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));
    const admin = localStorage.getItem("admin");
    const employee = localStorage.getItem("employee");
    const customer = localStorage.getItem("customer");
    if (user) {
      if (customer) {
        if (user) {
          dispatch({ type: "USER", payload: user });
          if (history.location.pathname.startsWith("/signin"))
            history.push("/");
          else if (history.location.pathname.startsWith("/admin"))
            history.push("/");
          else if (history.location.pathname.startsWith("/employee"))
            history.push("/");
          else if (history.location.pathname.startsWith("/adminLogin"))
            history.push("/");
          else if (history.location.pathname.startsWith("/addUsers"))
            history.push("/");
        } else {
          if (
            !history.location.pathname.startsWith("/adminLogin") &&
            !history.location.pathname.startsWith("/employeeLogin")
          )
            history.push("/signin");
        }
      }
      if (admin) {
        if (user) {
          dispatch({ type: "USER", payload: user });
          if (history.location.pathname.startsWith("/signin" && "/adminLogin"))
            history.push("/");
        } else {
          if (!history.location.pathname.startsWith("/reset" && "/adminLogin"))
            history.push("/signin");
        }
      }
      if (employee) {
        if (user) {
          dispatch({ type: "USER", payload: user });
          if (history.location.pathname.startsWith("/signin" && "/adminLogin"))
            history.push("/");
          else if (history.location.pathname.startsWith("/signup"))
            history.push("/");
          else if (history.location.pathname.startsWith("/admin"))
            history.push("/");
          else if (history.location.pathname.startsWith("/user"))
            history.push("/");
          else if (history.location.pathname.startsWith("/addUsers"))
            history.push("/");
        } else {
          if (
            !history.location.pathname.startsWith("/reset" && "/employeeLogin")
          )
            history.push("/signin");
        }
      }
    } else {
      if (
        !history.location.pathname.startsWith("/adminLogin") &&
        !history.location.pathname.startsWith("/employeeLogin") &&
        !history.location.pathname.startsWith("/employeeLogin")
      )
        history.push("/signin");
    }
  }, []);

  const customer = localStorage.getItem("customer");
  const admin = localStorage.getItem("admin");
  const employee = localStorage.getItem("employee");
  return (
    <Switch>
      <Route exact path="/signin">
        <Login />
      </Route>
      <Route exact path="/adminLogin">
        <Admin_Login />
      </Route>
      <Route exact path="/video_call">
        <VideoCalling />
      </Route>
      <Route exact path="/addUsers">
        <AddUsers />
      </Route>
      <Route exact path="/employeeLogin">
        <Employee_Login />
      </Route>
      <Route exact path="/video">
        <VideoCallSCreen />
      </Route>
      <Route exact path="/DynamicUpload">
        <DynamicUpload />
      </Route>
      <Route exact path="/PurchasedOrder">
        <PurchasedOrder />
      </Route>
      <Route exact path="/PaymentNotification">
        <PaymentNotification />
      </Route>
      <Route exact path="/PaymentPortal">
        <PaymentPortal />
      </Route>

      <Route exact path="/">
        {admin ? (
          <Admin />
        ) : employee ? (
          <Employee />
        ) : customer ? (
          <UserOrderRequest />
        ) : null}
      </Route>
    </Switch>
  );
};

const roomAuth = () => {
  const user = localStorage.getItem("user");
  const employee = localStorage.getItem("employee");
  if (user) {
    return <Chat />;
  }
  if (employee) {
    return <Chat />;
  }
};
function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  return (
    <div>
      <Usercontext.Provider value={{ state, dispatch }}>
        <BrowserRouter>
          {roomAuth()}
          <Routing />
        </BrowserRouter>
      </Usercontext.Provider>
    </div>
  );
}
export default App;
