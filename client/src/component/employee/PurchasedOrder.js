
import React, { useState, useEffect, useContext } from "react";
import '../../css/index.css'
import '../../css/normalize.css'
import '../../css/PurchasedOrder_Form_main.css'
import { Link, useHistory } from "react-router-dom";
import { Usercontext } from "../../App";

import Profile from '../../img/seth-doyle-uJ8LNVCBjFQ-unsplash.jpg';
import Dashbord from '../../img/dashboard.svg';
import AddUser from '../../img/adduser.svg';
import Callhistory from '../../img/callhistory.svg';


import io from "socket.io-client";
let socket;
const ENDPOINT = 'http://localhost:4000/';

const App = () => {
    const { dispatch } = useContext(Usercontext);
    const history = useHistory();
    const Employee_Name = localStorage.getItem("name")

    const [ItemTypeData, setItemTypeData] = useState("");
    const [ItemPrice, setItemPrice] = useState("");
    const [PurchasedOrderArray, setPurchasedOrderArray] = useState([]);



    useEffect(() => {

        socket = io(ENDPOINT);

    }, [ENDPOINT]);

    const UploadMenData = () => {
        if (ItemTypeData != "") {
            var Item = " Item: " + ItemTypeData + " - " + "Price: ₹" + ItemPrice + ".00"
            setPurchasedOrderArray([...PurchasedOrderArray, { Item: ItemTypeData, Price: ItemPrice }])
            setItemTypeData("")
        }
    }
    const deleteMenItem = (index) => {

        const values = [...PurchasedOrderArray];
        values.splice(index, 1);
        setPurchasedOrderArray(values);

    }


    const PostPurchasedOrder = () => {
        if (PurchasedOrderArray.length > 0) {
            const Customer = localStorage.getItem("userToCall");
            if (Customer) {

                var PurchasedOrder_Customer = {
                    CustomerID: Customer,
                    data: PurchasedOrderArray
                }
                socket.emit('PurchasedOrder', PurchasedOrder_Customer);
                UploadOrderData_DB(PurchasedOrder_Customer)
                setPurchasedOrderArray([])

            } else {

            }


        }
    }
    const UploadOrderData_DB = (PurchasedOrder_Customer) => {
        fetch("/PostPurchasedOrderData", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                PurchasedOrder_Customer: PurchasedOrder_Customer
            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    console.log("Upload Error");
                } else {
                    console.log("OrderData Upload Succesfully");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

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
            <div className="main">
                <header class="header">
                    <div class="header__wrapper">
                        <div className="search" >
                            <h4>Suriya Fashion World</h4>
                        </div>

                    </div>
                </header>
                <div className="PurchasedOrder_Form_main">
                    <h4>Add Purchased Order Details</h4>
                    <div className="PurchasedOrder_Form_content_main">

                        <div className="PurchasedOrder_Form_content_Input_Main">
                            <input type="text" placeholder="Enter Dress Type" value={ItemTypeData} onChange={(e) => setItemTypeData(e.target.value)} />
                            <input type="number" placeholder="Enter Dress Type" value={ItemPrice} onChange={(e) => setItemPrice(e.target.value)} />
                            <i class="fa fa-plus-circle " aria-hidden="true" onClick={UploadMenData} ></i>
                        </div>
                        <div className="PurchasedOrder_Form_content_FilledResult_Main">
                            {PurchasedOrderArray.map((result, index) => {
                                return (
                                    <div key={index} className="PurchasedOrder_Form_content_FilledResult">
                                        <span><span> <strong> Item:</strong>{result.Item}</span><span> <strong> Price:</strong> ₹{result.Price}</span></span>
                                        <i class="fa fa-minus-circle" onClick={() => deleteMenItem(index)} aria-hidden="true"></i>
                                    </div>

                                );
                            })}
                        </div>
                        <button
                            style={{ width: "180px", marginTop: '50px' }}
                            class="banner__button"
                            type="button"
                            onClick={PostPurchasedOrder}
                        >
                            Sent Order
                        </button>
                    </div>
                </div>
            </div>
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
