import React, { useState, useEffect, useContext } from "react";
import '../css/index.css'
import '../css/normalize.css'
import '../css/employee.css'
import { Link, useHistory } from "react-router-dom";
import { Usercontext } from "../App";
// Images
import Dashbord from '../img/dashboard.svg';
import AddUser from '../img/adduser.svg';
import Callhistory from '../img/callhistory.svg';
import Profile from '../img/seth-doyle-uJ8LNVCBjFQ-unsplash.jpg';
const App = () => {
    const { dispatch } = useContext(Usercontext);
    const history = useHistory();
    return (

        <div class="wrapper">
            <nav class="nav">
                <ul class="nav__list" role="menubar">
                    <li class="nav__item nav__item--isActive">
                        <a
                            href="#"
                            class="nav__link focus--box-shadow"
                            role="menuitem"
                            aria-label="Home"
                        >
                            <div className="nav__icon">
                                <img src={Dashbord} alt="" />
                            </div>
                        </a>
                    </li>
                    <li class="nav__item">
                        <a
                            href="#"
                            class="nav__link focus--box-shadow"
                            role="menuitem"
                            aria-label="Favorite projects"
                        >
                            <div className="nav__icon">
                                <img src={AddUser} alt="" />
                            </div>
                        </a>
                    </li>
                    <li class="nav__item">
                        <a
                            href="#"
                            class="nav__link focus--box-shadow"
                            role="menuitem"
                            aria-label="Informational messages"
                        ><svg
                            class="nav__icon"
                            xmlns="http://www.w3.org/2000/svg"
                            viewBox="0 0 24 24"
                            role="presentation"
                        >
                                <path
                                    d="M12,11a1,1,0,0,0-1,1v3a1,1,0,0,0,2,0V12A1,1,0,0,0,12,11Zm0-3a1,1,0,1,0,1,1A1,1,0,0,0,12,8Zm0-6A10,10,0,0,0,2,12a9.89,9.89,0,0,0,2.26,6.33l-2,2a1,1,0,0,0-.21,1.09A1,1,0,0,0,3,22h9A10,10,0,0,0,12,2Zm0,18H5.41l.93-.93a1,1,0,0,0,.3-.71,1,1,0,0,0-.3-.7A8,8,0,1,1,12,20Z"
                                />
                            </svg>
                        </a>
                    </li>
                    <li class="nav__item">
                        <a
                            href="#"
                            class="nav__link focus--box-shadow"
                            role="menuitem"
                            aria-label="Collections"
                        >
                            <svg
                                class="nav__icon"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                role="presentation"
                            >
                                <path
                                    d="M2.5,10.56l9,5.2a1,1,0,0,0,1,0l9-5.2a1,1,0,0,0,0-1.73l-9-5.2a1,1,0,0,0-1,0l-9,5.2a1,1,0,0,0,0,1.73ZM12,5.65l7,4-7,4.05L5,9.69Zm8.5,7.79L12,18.35,3.5,13.44a1,1,0,0,0-1.37.36,1,1,0,0,0,.37,1.37l9,5.2a1,1,0,0,0,1,0l9-5.2a1,1,0,0,0,.37-1.37A1,1,0,0,0,20.5,13.44Z"
                                />
                            </svg>
                        </a>
                    </li>
                    <li class="nav__item">
                        <a
                            href="#"
                            class="nav__link focus--box-shadow"
                            role="menuitem"
                            aria-label="Analytics"
                        >
                            <svg
                                class="nav__icon"
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                role="presentation"
                            >
                                <path
                                    d="M6,13H2a1,1,0,0,0-1,1v8a1,1,0,0,0,1,1H6a1,1,0,0,0,1-1V14A1,1,0,0,0,6,13ZM5,21H3V15H5ZM22,9H18a1,1,0,0,0-1,1V22a1,1,0,0,0,1,1h4a1,1,0,0,0,1-1V10A1,1,0,0,0,22,9ZM21,21H19V11h2ZM14,1H10A1,1,0,0,0,9,2V22a1,1,0,0,0,1,1h4a1,1,0,0,0,1-1V2A1,1,0,0,0,14,1ZM13,21H11V3h2Z"
                                />
                            </svg>
                        </a>
                    </li>
                </ul>
            </nav>
            <main class="main">
                <header class="header">
                    <div class="header__wrapper">
                        <form action="" class="search">
                            <button class="search__button focus--box-shadow" type="submit">
                                <svg
                                    class="search__icon"
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                >
                                    <path
                                        d="M21.71,20.29,18,16.61A9,9,0,1,0,16.61,18l3.68,3.68a1,1,0,0,0,1.42,0A1,1,0,0,0,21.71,20.29ZM11,18a7,7,0,1,1,7-7A7,7,0,0,1,11,18Z"
                                    />
                                </svg>
                            </button>
                            <input
                                class="search__input focus--box-shadow"
                                type="text"
                                placeholder="search Here"
                            />
                        </form>

                    </div>
                </header>

                <div class="a_wrapper">
                    <div class="title">
                        Order Details
                    </div>
                    <div class="form form-section-container-main">
                        <div className="form-section-container">

                            <div className="form-section1">
                                <div class="inputfield">
                                    <label>First Name</label>
                                    <input type="text" class="input" />
                                </div>
                                <div class="inputfield">
                                    <label>First Name</label>
                                    <input type="text" class="input" />
                                </div>
                                <div class="inputfield">
                                    <label>Last Name</label>
                                    <input type="text" class="input" />
                                </div>
                                <div class="inputfield">
                                    <label>Password</label>
                                    <input type="password" class="input" />
                                </div>
                                <div class="inputfield">
                                    <label>Confirm Password</label>
                                    <input type="password" class="input" />
                                </div>
                            </div>
                            <div className="form-section2">
                                <div class="inputfield">
                                    <label>Gender</label>
                                    <div class="custom_select">
                                        <select>
                                            <option value="">Select</option>
                                            <option value="male">Male</option>
                                            <option value="female">Female</option>
                                        </select>
                                    </div>
                                </div>
                                <div class="inputfield">
                                    <label>Email Address</label>
                                    <input type="text" class="input" />
                                </div>
                                <div class="inputfield">
                                    <label>Phone Number</label>
                                    <input type="text" class="input" />
                                </div>
                                <div class="inputfield">
                                    <label>Address</label>
                                    <textarea class="textarea"></textarea>
                                </div>
                                <div class="inputfield">
                                    <label>Postal Code</label>
                                    <input type="text" class="input" />
                                </div>
                            </div>
                        </div>


                        <div class="inputfield terms">
                            <label class="check">
                                <input type="checkbox" />
                                <span class="checkmark"></span>
                            </label>
                            <p>Agreed to terms and conditions</p>
                        </div>
                        <div className="UserRequestBtn">
                            <button style={{ width: '180px' }} class="banner__button" type="button">
                                Request Call
                            </button>
                        </div>

                    </div>
                </div>

            </main>
            <aside class="aside">
                <section class="section">
                    <div class="aside__control">
                        <button
                            class="aside__button focus--box-shadow"
                            type="button"
                            aria-label="Close profile settings"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                role="presentation"
                            >
                                <path
                                    d="M17,11H9.41l3.3-3.29a1,1,0,1,0-1.42-1.42l-5,5a1,1,0,0,0-.21.33,1,1,0,0,0,0,.76,1,1,0,0,0,.21.33l5,5a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L9.41,13H17a1,1,0,0,0,0-2Z"
                                />
                            </svg>
                        </button>
                        <button
                            class="aside__button  focus--box-shadow"
                            type="button"
                            aria-label="You have new feedback"
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                role="presentation"
                            >
                                <path
                                    d="M18,13.18V10a6,6,0,0,0-5-5.91V3a1,1,0,0,0-2,0V4.09A6,6,0,0,0,6,10v3.18A3,3,0,0,0,4,16v2a1,1,0,0,0,1,1H8.14a4,4,0,0,0,7.72,0H19a1,1,0,0,0,1-1V16A3,3,0,0,0,18,13.18ZM8,10a4,4,0,0,1,8,0v3H8Zm4,10a2,2,0,0,1-1.72-1h3.44A2,2,0,0,1,12,20Zm6-3H6V16a1,1,0,0,1,1-1H17a1,1,0,0,1,1,1Z"
                                />
                            </svg>
                        </button>
                    </div>
                    <div class="profile-main">
                        <button
                            class="profile-main__setting focus--box-shadow"
                            type="button"
                        >
                            <img
                                class="profile-main__photo"
                                src={Profile}
                                alt="Profile photo"
                            />
                        </button>
                        <h1 class="profile-main__name">Jessica</h1>
                    </div>
                    <ul class="statistics">
                        <li class="statistics__entry">
                            <a class="statistics__entry-description" href="#">Total Employees</a
                            ><span class="statistics__entry-quantity">10K</span>
                        </li>
                        <li class="statistics__entry">
                            <a class="statistics__entry-description" href="#">Total Users</a
                            ><span class="statistics__entry-quantity">50K</span>
                        </li>
                        <li class="statistics__entry">
                            <a class="statistics__entry-description" href="#">Total Stocks</a
                            ><span class="statistics__entry-quantity">480K</span>
                        </li>
                        <li class="statistics__entry">
                            <a class="statistics__entry-description" href="#">Active Users</a
                            ><span class="statistics__entry-quantity">10K</span>
                        </li>
                        <li class="statistics__entry">
                            <a class="statistics__entry-description" href="#">Feedback</a
                            ><span class="statistics__entry-quantity">50K</span>
                        </li>
                    </ul>

                    <button class="banner__button" type="button"
                        onClick={() => {
                            localStorage.clear();
                            dispatch({ type: "CLEAR" });
                            history.push("/signin");
                        }}
                    >
                        Log Out
                    </button>
                </section>
            </aside>
        </div >


    );
}

export default App;
