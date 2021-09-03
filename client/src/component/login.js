
import React, { useState, useEffect, useContext } from "react";
import '../css/login.css'
import { Link, useHistory } from "react-router-dom";
import { Usercontext } from "../App";
import Signin_Wallpaper from '../img/signin_wallpaper.jpg'
import SignUp_Wallpaper from '../img/Signup_Wallpaper.jpg'

const App = () => {
    const { dispatch } = useContext(Usercontext);
    const history = useHistory();
    // Animation
    const toggleForm = () => {
        const container = document.querySelector('.login-animation-container');
        container.classList.toggle('active');
    };


    // Login
    const [Login_email, setSignIn_Email] = useState("");
    const [Login_password, setSignIn_Password] = useState("");

    const LoginPostData = () => {
        if (
            !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                Login_email
            )
        ) {
            // M.toast({ html: "Invalid e-mail Id", classes: "#c62828 red darken-3" });
            return;
        }
        fetch("/signin", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                password: Login_password,
                email: Login_email,
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    // M.toast({ html: data.error, classes: "#c62828 red darken-3" });
                } else {

                    localStorage.setItem("jwt", data.token);
                    localStorage.setItem("customer", data.token);
                    localStorage.setItem("user", JSON.stringify(data.user));
                    localStorage.setItem("name", data.user.name);
                    localStorage.setItem("room", "welcomeSuriyafasionworld");
                    localStorage.setItem("id", data.user._id);
                    dispatch({ type: "USER", payload: data.user });
                    // M.toast({
                    //   html: "signed successfully",
                    //   classes: "#43a047 green darken-1",
                    // });
                    history.push("/");
                }
            });
    };


    // Sign Up
    const [SignUp_name, setSignUP_Name] = useState("");
    const [SignUp_password, setSignUP_Password] = useState("");
    const [SignUp_email, setSignUP_Email] = useState("");
    const [SignUp_image, setSignUP_Image] = useState("");
    const [SignUp_url, setSignUp_Url] = useState(undefined);

    // useEffect(() => {
    //     if (SignUp_url) {
    //         uploadField();
    //     }
    // }, [SignUp_url]);
    // const uploadPic = () => {
    //     const data = new FormData();
    //     data.append("file", SignUp_image);
    //     data.append("upload_preset", "rajaimages");
    //     data.append("cloud_name", "tr237110");
    //     fetch("https://api.cloudinary.com/v1_1/tr237110/image/upload", {
    //         method: "post",
    //         body: data,
    //     })
    //         .then((res) => res.json())
    //         .then((data) => {
    //             setSignUp_Url(data.url);
    //         })
    //         .catch((err) => {
    //             console.log(err);
    //         });
    // };

    const uploadField = () => {
        if (
            !/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
                SignUp_email
            )
        ) {
            // M.toast({ html: "Invalid e-mail Id", classes: "#c62828 red darken-3" });
            return;
        }
        fetch("/signup", {
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
                    toggleForm()
                }
            });
    };
    const SignUp_PostData = () => {
        // if (SignUp_image) {
        //     uploadPic();
        // } else {
        //     uploadField();
        // }
        uploadField();
    };



    return (
        <div className="login-main-container">
            <div className="container login-animation-container">
                <div className="user signinBx">
                    <div className="imgBx"><img src={Signin_Wallpaper} alt="Wallpaper" /></div>
                    <div className="Auth-Input-Containers">
                        <div className="Auth-Input-Container_Main">
                            <h1>Welcome to Suriya</h1>
                            <h2>Sign In</h2>
                            <input
                                type="email"
                                placeholder="Email"
                                onChange={(e) => setSignIn_Email(e.target.value)}
                                name="email"
                            />
                            <input
                                type="password"
                                placeholder="Password"
                                onChange={(e) => setSignIn_Password(e.target.value)}
                                name="password"
                            />
                            <input type="submit" onClick={() => LoginPostData()} value="Sign In" />

                            <p className="signup">
                                Don't have an account ?
                                <a href="#" onClick={toggleForm}>Sign Up.</a>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="user signupBx">
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
                </div>
            </div>
        </div>
    );
}

export default App;
