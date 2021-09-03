
import React, { useState, useEffect, useContext } from "react";
import '../../css/index.css'
import '../../css/normalize.css'
import { Link, useHistory } from "react-router-dom";
import { Usercontext } from "../../App";

import Profile from '../../img/seth-doyle-uJ8LNVCBjFQ-unsplash.jpg';
import Dashbord from '../../img/dashboard.svg';
import AddUser from '../../img/adduser.svg';
import Callhistory from '../../img/callhistory.svg';
const App = () => {
    const { dispatch } = useContext(Usercontext);
    const history = useHistory();
    const Employee_Name = localStorage.getItem("name")
    return (

        <div class="wrapper " id="employee_main_content">
            <nav className="nav">
                <ul className="nav__list" role="menubar">
                    <li className="nav__item nav__item--isActive">
                        <a
                            href="/"
                            className="nav__link focus--box-shadow"
                            role="menuitem"
                            aria-label="Home"
                        >
                            <div className="nav__icon">
                                <i class="fa fa-home " style={{ color: '#fff', fontSize: '30px' }} aria-hidden="true"></i>
                            </div>
                        </a>
                    </li>
                    <li className="nav__item">
                        <a
                            href="/addUsers"
                            className="nav__link focus--box-shadow"
                            role="menuitem"
                            aria-label="Favorite projects"
                        >
                            <i class="fa fa-address-book-o nav__iconFaFaicon" style={{ fontSize: '30px' }} aria-hidden="true"></i>
                        </a>
                    </li>
                    <li className="nav__item">
                        <a
                            href="#"
                            className="nav__link focus--box-shadow"
                            role="menuitem"
                            aria-label="Informational messages"
                        >
                            <i className="fa fa-cloud-upload nav__iconFaFaicon" style={{ fontSize: '30px' }} aria-hidden="true"></i>
                        </a>
                    </li>
                    <li className="nav__item">
                        <a
                            href="#"
                            className="nav__link focus--box-shadow"
                            role="menuitem"
                            aria-label="Collections"
                        >
                            <i class="fa fa-check-circle nav__iconFaFaicon" style={{ fontSize: '30px' }} aria-hidden="true"></i>
                        </a>
                    </li>
                    <li className="nav__item">
                        <a
                            href="#"
                            className="nav__link focus--box-shadow"
                            role="menuitem"
                            aria-label="Analytics"
                        >
                            <i class="fa fa-pie-chart nav__iconFaFaicon" style={{ fontSize: '30px' }} aria-hidden="true"></i>
                        </a>
                    </li>
                </ul>
            </nav>
            <main class="main">
                <header class="header">
                    <div class="header__wrapper">
                        <div className="search" >
                            <h4>Suriya Fashion World</h4>
                        </div>

                    </div>
                </header>
                <section class="section">
                    <header class="section__header">
                        <h2 class="section__title">Dashbord</h2>

                    </header>
                    <ul class="team">
                        <li class="team__item">
                            <a class="team__link focus--box-shadow" href="#">
                                <div>
                                    <span style={{ fontSize: '50px ' }}>56</span>

                                </div>
                                <div class="team__inform">
                                    <p class="team__name">Today Calls</p>
                                    <time class="date"
                                    >05 May, 2020</time>
                                </div>
                            </a>
                        </li>
                        <li class="team__item">
                            <a class="team__link focus--box-shadow" href="#">
                                <div>
                                    <span style={{ fontSize: '50px ' }}>56</span>

                                </div>
                                <div class="team__inform">
                                    <p class="team__name">Today Orders</p>
                                    <time class="date"
                                    >05 May, 2020</time>
                                </div>
                            </a>
                        </li>
                        <li class="team__item">
                            <a class="team__link focus--box-shadow" href="#">
                                <div>
                                    <span style={{ fontSize: '50px ' }}>56</span>

                                </div>
                                <div class="team__inform">
                                    <p class="team__name">Total Orders</p>
                                    <time class="date"
                                    >05 May, 2020</time>
                                </div>
                            </a>
                        </li>
                    </ul>
                </section>
                <section class="section">
                    <header class="section__header">
                        <h2 class="section__title">Calls History</h2>
                        <div class="section__control">
                            <button
                                class="section__button focus--box-shadow"
                                type="button"
                                aria-label="Filter projects"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    role="presentation"
                                >
                                    <path
                                        d="M20,8.18V3a1,1,0,0,0-2,0V8.18a3,3,0,0,0,0,5.64V21a1,1,0,0,0,2,0V13.82a3,3,0,0,0,0-5.64ZM19,12a1,1,0,1,1,1-1A1,1,0,0,1,19,12Zm-6,2.18V3a1,1,0,0,0-2,0V14.18a3,3,0,0,0,0,5.64V21a1,1,0,0,0,2,0V19.82a3,3,0,0,0,0-5.64ZM12,18a1,1,0,1,1,1-1A1,1,0,0,1,12,18ZM6,6.18V3A1,1,0,0,0,4,3V6.18a3,3,0,0,0,0,5.64V21a1,1,0,0,0,2,0V11.82A3,3,0,0,0,6,6.18ZM5,10A1,1,0,1,1,6,9,1,1,0,0,1,5,10Z"
                                    />
                                </svg>
                            </button>

                        </div>
                    </header>
                    <ul class="project">
                        <li class="project__item">
                            <a href="#" class="project__link focus--box-shadow">
                                <div class="project__wrapper">
                                    <div class="project__element project__icon">
                                        <div
                                            class="icon icon--viking"
                                            aria-label="Icon of the 'Showcase Design' project"
                                        >
                                            <img style={{ borderRadius: '50px' }} src={Profile} alt="" />
                                        </div>
                                    </div>
                                    <div class="project__element project__inform">
                                        <span class="project__inform-name"
                                        >EMPlOYEE: <strong style={{ marginLeft: '10px', color: '#7a61b7' }}>Rajajayaruban</strong></span>
                                    </div>
                                    <div class="project__element project__photo">
                                        <ul class="photo">
                                            <li >
                                                <span style={{ marginRight: '20px' }} class="status status--in-work">Customer: <strong style={{ color: '#000' }}>Jessica</strong></span>
                                            </li>
                                            <li class="photo__item" style={{ width: '60px', height: '60px' }}>
                                                <img
                                                    src={Profile}
                                                    alt="Jack's photo"
                                                />
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="project__element project__date">
                                        <time class="date" datetime="2020-05-05T10:00:00"
                                        >05 May, 2020</time
                                        >
                                    </div>
                                    <div class="project__element project__status">
                                        <span style={{ color: '#7a61b7' }} class="status status--published">Duration: <strong style={{ color: '#f98f8e' }}>15m</strong></span>
                                    </div>
                                    <div class="project__element project__status">
                                        <span class="status status--published">View Detailed</span>
                                    </div>

                                </div>
                            </a>
                        </li>
                        <li class="project__item">
                            <a href="#" class="project__link focus--box-shadow">
                                <div class="project__wrapper">
                                    <div class="project__element project__icon">
                                        <div
                                            class="icon icon--viking"
                                            aria-label="Icon of the 'Showcase Design' project"
                                        >
                                            <img style={{ borderRadius: '50px' }} src={Profile} alt="" />
                                        </div>
                                    </div>
                                    <div class="project__element project__inform">
                                        <span class="project__inform-name"
                                        >EMPlOYEE: <strong style={{ marginLeft: '10px', color: '#7a61b7' }}>Rajajayaruban</strong></span>
                                    </div>
                                    <div class="project__element project__photo">
                                        <ul class="photo">
                                            <li >
                                                <span style={{ marginRight: '20px' }} class="status status--in-work">Customer: <strong style={{ color: '#000' }}>Jessica</strong></span>
                                            </li>
                                            <li class="photo__item" style={{ width: '60px', height: '60px' }}>
                                                <img
                                                    src={Profile}
                                                    alt="Jack's photo"
                                                />
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="project__element project__date">
                                        <time class="date" datetime="2020-05-05T10:00:00"
                                        >05 May, 2020</time
                                        >
                                    </div>
                                    <div class="project__element project__status">
                                        <span style={{ color: '#7a61b7' }} class="status status--published">Duration: <strong style={{ color: '#f98f8e' }}>15m</strong></span>
                                    </div>
                                    <div class="project__element project__status">
                                        <span class="status status--published">View Detailed</span>
                                    </div>

                                </div>
                            </a>
                        </li>
                        <li class="project__item">
                            <a href="#" class="project__link focus--box-shadow">
                                <div class="project__wrapper">
                                    <div class="project__element project__icon">
                                        <div
                                            class="icon icon--viking"
                                            aria-label="Icon of the 'Showcase Design' project"
                                        >
                                            <img style={{ borderRadius: '50px' }} src={Profile} alt="" />
                                        </div>
                                    </div>
                                    <div class="project__element project__inform">
                                        <span class="project__inform-name"
                                        >EMPlOYEE: <strong style={{ marginLeft: '10px', color: '#7a61b7' }}>Rajajayaruban</strong></span>
                                    </div>
                                    <div class="project__element project__photo">
                                        <ul class="photo">
                                            <li >
                                                <span style={{ marginRight: '20px' }} class="status status--in-work">Customer: <strong style={{ color: '#000' }}>Jessica</strong></span>
                                            </li>
                                            <li class="photo__item" style={{ width: '60px', height: '60px' }}>
                                                <img
                                                    src={Profile}
                                                    alt="Jack's photo"
                                                />
                                            </li>
                                        </ul>
                                    </div>
                                    <div class="project__element project__date">
                                        <time class="date" datetime="2020-05-05T10:00:00"
                                        >05 May, 2020</time
                                        >
                                    </div>
                                    <div class="project__element project__status">
                                        <span style={{ color: '#7a61b7' }} class="status status--published">Duration: <strong style={{ color: '#f98f8e' }}>15m</strong></span>
                                    </div>
                                    <div class="project__element project__status">
                                        <span class="status status--published">View Detailed</span>
                                    </div>

                                </div>
                            </a>
                        </li>
                    </ul>
                </section>
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
                        <h1 class="profile-main__name">{Employee_Name}</h1>
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

                    <button
                        class="banner__button" type="button"
                        onClick={() => {
                            localStorage.clear();
                            dispatch({ type: "CLEAR" });
                            history.push("/employeeLogin");
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
