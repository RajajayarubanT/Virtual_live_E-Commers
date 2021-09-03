
import React, { useState, useEffect, useContext } from "react";
import '../../css/index.css'
import '../../css/normalize.css'
import '../../css/addUser.css'
import { Link, useHistory } from "react-router-dom";
import { Usercontext } from "../../App";

import AdminMainContent from './adminMainContent';
import AdminNav from './adminNav';
import Admin_sidseView from './admin_sidseView';


import Profile from '../../img/seth-doyle-uJ8LNVCBjFQ-unsplash.jpg';
import _Dashbord from '../../img/_dashbord.svg';
import AddUser from '../../img/_addUser.svg';
import Callhistory from '../../img/callhistory.svg';
import Signin_Wallpaper from '../../img/signin_wallpaper.jpg'
const App = () => {
    const { dispatch } = useContext(Usercontext);
    const history = useHistory();


    const [SignUp_name, setSignUP_Name] = useState("");
    const [SignUp_password, setSignUP_Password] = useState("");
    const [SignUp_email, setSignUP_Email] = useState("");
    const [SignUp_image, setSignUP_Image] = useState("");
    const [SignUp_url, setSignUp_Url] = useState(undefined);
    const Admin_Name = localStorage.getItem("name")

    const SignUp_PostData = () => {
        if (
            !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                SignUp_email
            )
        ) {
            // M.toast({ html: "Invalid e-mail Id", classes: "#c62828 red darken-3" });
            return;
        }
        fetch("/employee_signup", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: SignUp_name,
                password: SignUp_password,
                email: SignUp_email,
                pic: SignUp_url,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    // M.toast({ html: data.error, classes: "#c62828 red darken-3" });
                } else {
                    // M.toast({ html: data.message, classes: "#43a047 green darken-1" });
                    history.push("/admin");
                }
            });
    };








    return (

        <div class="wrapper">
            <AdminNav />
            <main class="main">
                <header class="header">
                    <div class="header__wrapper">
                        <div className="search" >
                            <h4>Suriya Fashion World</h4>
                        </div>
                    </div>
                </header>
                <section class="section" style={{ padding: '0 0 0 10px' }}>
                    <header class="section__header">
                        <h2 className="section__title">Add Employees</h2>
                    </header>

                </section>
                <section class="section">
                    <div className="addUser-main-container">
                        <div className="container login-animation-container">
                            <div className="user signinBx">
                                <div className="imgBx"><img src={Signin_Wallpaper} alt="Wallpaper" /></div>
                                <div className="Auth-Input-Containers">
                                    <div className="Auth-Input-Container_Main">
                                        <h1 >Welcome to Suriya</h1>
                                        <h2>Register here</h2>
                                        <input
                                            type="text"
                                            placeholder="Username"
                                            onChange={(e) => setSignUP_Name(e.target.value)}
                                            name="name"
                                        />
                                        <input
                                            type="email"
                                            placeholder="Email"
                                            onChange={(e) => setSignUP_Email(e.target.value)}
                                            disableUnderline={true}
                                            name="email"
                                        />
                                        <input
                                            type="password"
                                            placeholder="Password"
                                            disableUnderline={true}
                                            onChange={(e) => setSignUP_Password(e.target.value)}
                                            name="password"
                                        />
                                        <input type="submit" value="Add User" onClick={() => SignUp_PostData()} />
                                        {/* 
                            <p className="signup">
                                Don't have an account ?
                                <a href="#" onClick={toggleForm}>Sign Up.</a>
                            </p> */}
                                    </div>
                                </div>
                            </div>
                            {/* <div className="user signupBx">
                    <div className="Auth-Input-Containers">
                        <div className="Auth-Input-Container_Main">

                            <h2>Create an account</h2>

                            <input
                                type="text"
                                placeholder="Username"
                                onChange={(e) => setSignUP_Name(e.target.value)}
                                name="name"
                            />
                            <input
                                type="email"
                                placeholder="Email"
                                onChange={(e) => setSignUP_Email(e.target.value)}
                                disableUnderline={true}
                                name="email"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                disableUnderline={true}
                                onChange={(e) => setSignUP_Password(e.target.value)}
                                name="password"
                            />
                            <input type="submit" value="Sign Up" onClick={() => SignUp_PostData()} />
                            <p className="signup">
                                Already have an account ?
                                <a href="#" onClick={toggleForm}>Sign in.</a>
                            </p>
                        </div>
                    </div>
                    <div className="imgBx"><img src={SignUp_Wallpaper} alt="Wallpaper" /></div>
                </div> */}
                        </div>
                    </div>

                </section>
            </main>
            <Admin_sidseView />
        </div >


    );
}

export default App;
