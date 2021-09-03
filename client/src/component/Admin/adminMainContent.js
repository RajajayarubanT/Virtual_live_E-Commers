
import React, { useState, useEffect, useContext } from "react";
import '../../css/index.css'
import '../../css/admin.css'
import '../../css/normalize.css'
import { Link, useHistory } from "react-router-dom";
import { Usercontext } from "../../App";

import Profile from '../../img/seth-doyle-uJ8LNVCBjFQ-unsplash.jpg';
import Dashbord from '../../img/dashboard.svg';
import AddUser from '../../img/adduser.svg';
import ShopLogo from '../../img/suriya_logo.png';
const App = () => {
    const { dispatch } = useContext(Usercontext);
    const history = useHistory();
    const [employeeCount, setEmployeeCount] = useState(null);
    const [userCount, setUserCount] = useState(null);
    const [orderCount, setOrderCount] = useState(null);

    useEffect(() => {
        fetch("/requested-employeesData")
            .then((res) => res.json())
            .then((result) => {
                let Employeecount = result.employee.length
                let UserCount = result.customer.length
                let OrderCount = result.customerOrder.length
                setEmployeeCount(Employeecount)
                setUserCount(UserCount)
                setOrderCount(OrderCount)

            });
    }, []);




    return (


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
                <ul className="team">
                    <li className="team__item">
                        <a className="team__link focus--box-shadow" href="#">
                            <div>
                                <span style={{ fontSize: '50px ' }}>{orderCount}</span>

                            </div>
                            <div className="team__inform">
                                <p className="team__name">Total Orders</p>
                                <time className="date"
                                >05 May, 2020</time>
                            </div>
                        </a>
                    </li>
                    <li className="team__item">
                        <a className="team__link focus--box-shadow" href="#">
                            <div>
                                <span style={{ fontSize: '50px ' }}>{userCount}</span>

                            </div>
                            <div className="team__inform">
                                <p className="team__name">Total Users</p>
                                <time className="date"
                                >05 May, 2020</time>
                            </div>
                        </a>
                    </li>
                    <li className="team__item">
                        <a className="team__link focus--box-shadow" href="#">
                            <div>
                                <span style={{ fontSize: '50px ' }}>{employeeCount}</span>

                            </div>
                            <div className="team__inform">
                                <p className="team__name">Total Orders</p>
                                <time className="date"
                                >05 May, 2020</time>
                            </div>
                        </a>
                    </li>
                </ul>
            </section>
            <section className="section">
                <header className="section__header">
                    <h2 className="section__title">Calls History</h2>
                    {/* <div className="section__control">
                            <button
                                className="section__button focus--box-shadow"
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

                        </div> */}
                </header>
                <ul className="project">
                    <li className="project__item">
                        <a href="#" className="project__link focus--box-shadow">
                            <div className="project__wrapper">
                                <div className="project__element project__icon">
                                    <div
                                        className="icon icon--viking"
                                        aria-label="Icon of the 'Showcase Design' project"
                                    >
                                        <img style={{ borderRadius: '50px' }} src={Profile} alt="" />
                                    </div>
                                </div>
                                <div className="project__element project__inform">
                                    <span className="project__inform-name"
                                    >EMPlOYEE: <strong style={{ marginLeft: '10px', color: '#7a61b7' }}>Rajajayaruban</strong></span>
                                </div>
                                <div className="project__element project__photo">
                                    <ul className="photo">
                                        <li >
                                            <span style={{ marginRight: '20px' }} className="status status--in-work">Customer: <strong style={{ color: '#000' }}>Jessica</strong></span>
                                        </li>
                                        <li className="photo__item" style={{ width: '60px', height: '60px' }}>
                                            <img
                                                src={Profile}
                                                alt="Jack's photo"
                                            />
                                        </li>
                                    </ul>
                                </div>
                                <div className="project__element project__date">
                                    <time className="date" datetime="2020-05-05T10:00:00"
                                    >05 May, 2020</time
                                    >
                                </div>
                                <div className="project__element project__status">
                                    <span style={{ color: '#7a61b7' }} className="status status--published">Duration: <strong style={{ color: '#f98f8e' }}>15m</strong></span>
                                </div>
                                <div className="project__element project__status">
                                    <span className="status status--published">View Detailed</span>
                                </div>

                            </div>
                        </a>
                    </li>
                    <li className="project__item">
                        <a href="#" className="project__link focus--box-shadow">
                            <div className="project__wrapper">
                                <div className="project__element project__icon">
                                    <div
                                        className="icon icon--viking"
                                        aria-label="Icon of the 'Showcase Design' project"
                                    >
                                        <img style={{ borderRadius: '50px' }} src={Profile} alt="" />
                                    </div>
                                </div>
                                <div className="project__element project__inform">
                                    <span className="project__inform-name"
                                    >EMPlOYEE: <strong style={{ marginLeft: '10px', color: '#7a61b7' }}>Rajajayaruban</strong></span>
                                </div>
                                <div className="project__element project__photo">
                                    <ul className="photo">
                                        <li >
                                            <span style={{ marginRight: '20px' }} className="status status--in-work">Customer: <strong style={{ color: '#000' }}>Jessica</strong></span>
                                        </li>
                                        <li className="photo__item" style={{ width: '60px', height: '60px' }}>
                                            <img
                                                src={Profile}
                                                alt="Jack's photo"
                                            />
                                        </li>
                                    </ul>
                                </div>
                                <div className="project__element project__date">
                                    <time className="date" datetime="2020-05-05T10:00:00"
                                    >05 May, 2020</time
                                    >
                                </div>
                                <div className="project__element project__status">
                                    <span style={{ color: '#7a61b7' }} className="status status--published">Duration: <strong style={{ color: '#f98f8e' }}>15m</strong></span>
                                </div>
                                <div className="project__element project__status">
                                    <span className="status status--published">View Detailed</span>
                                </div>

                            </div>
                        </a>
                    </li>
                    <li className="project__item">
                        <a href="#" className="project__link focus--box-shadow">
                            <div className="project__wrapper">
                                <div className="project__element project__icon">
                                    <div
                                        className="icon icon--viking"
                                        aria-label="Icon of the 'Showcase Design' project"
                                    >
                                        <img style={{ borderRadius: '50px' }} src={Profile} alt="" />
                                    </div>
                                </div>
                                <div className="project__element project__inform">
                                    <span className="project__inform-name"
                                    >EMPlOYEE: <strong style={{ marginLeft: '10px', color: '#7a61b7' }}>Rajajayaruban</strong></span>
                                </div>
                                <div className="project__element project__photo">
                                    <ul className="photo">
                                        <li >
                                            <span style={{ marginRight: '20px' }} className="status status--in-work">Customer: <strong style={{ color: '#000' }}>Jessica</strong></span>
                                        </li>
                                        <li className="photo__item" style={{ width: '60px', height: '60px' }}>
                                            <img
                                                src={Profile}
                                                alt="Jack's photo"
                                            />
                                        </li>
                                    </ul>
                                </div>
                                <div className="project__element project__date">
                                    <time className="date" datetime="2020-05-05T10:00:00"
                                    >05 May, 2020</time
                                    >
                                </div>
                                <div className="project__element project__status">
                                    <span style={{ color: '#7a61b7' }} className="status status--published">Duration: <strong style={{ color: '#f98f8e' }}>15m</strong></span>
                                </div>
                                <div className="project__element project__status">
                                    <span className="status status--published">View Detailed</span>
                                </div>

                            </div>
                        </a>
                    </li>
                </ul>
            </section>
        </main>



    );
}

export default App;
