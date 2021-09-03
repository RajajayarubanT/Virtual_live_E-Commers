
import React, { useState, useEffect, useContext } from "react";
import '../../css/index.css'
import '../../css/admin.css'
import '../../css/normalize.css'
import { Link, useHistory } from "react-router-dom";
import { Usercontext } from "../../App";
import Profile from '../../img/seth-doyle-uJ8LNVCBjFQ-unsplash.jpg';

const App = () => {
    const { dispatch } = useContext(Usercontext);
    const history = useHistory();

    const Admin_Name = localStorage.getItem("name")



    return (

        <aside className="aside">
            <section className="section">
                <div className="profile-main">
                    <button
                        className="profile-main__setting focus--box-shadow"
                        type="button"
                    >
                        <img
                            className="profile-main__photo"
                            src={Profile}
                            alt="Profile photo"
                        />
                    </button>
                    <h1 className="profile-main__name">{Admin_Name}</h1>
                </div>
                <ul className="statistics">
                    <li className="statistics__entry">
                        <a className="statistics__entry-description" href="#">Total Employees</a
                        ><span className="statistics__entry-quantity">10K</span>
                    </li>
                    <li className="statistics__entry">
                        <a className="statistics__entry-description" href="#">Total Users</a
                        ><span className="statistics__entry-quantity">50K</span>
                    </li>
                    <li className="statistics__entry">
                        <a className="statistics__entry-description" href="#">Total Stocks</a
                        ><span className="statistics__entry-quantity">480K</span>
                    </li>
                    <li className="statistics__entry">
                        <a className="statistics__entry-description" href="#">Active Users</a
                        ><span className="statistics__entry-quantity">10K</span>
                    </li>
                    <li className="statistics__entry">
                        <a className="statistics__entry-description" href="#">Feedback</a
                        ><span className="statistics__entry-quantity">50K</span>
                    </li>
                </ul>

                <button
                    className="banner__button" type="button"
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



    );
}

export default App;
