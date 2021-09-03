
import React, { useState, useEffect, useContext } from "react";
import '../../css/index.css'
import '../../css/admin.css'
import '../../css/normalize.css'
import '../../css/dynamicUpload.css'
import { Link, useHistory } from "react-router-dom";
import { Usercontext } from "../../App";

import AdminMainContent from './adminMainContent';
import AdminNav from './adminNav';
import Admin_sidseView from './admin_sidseView';
import Profile from '../../img/seth-doyle-uJ8LNVCBjFQ-unsplash.jpg';
import Dashbord from '../../img/dashboard.svg';
import AddUser from '../../img/adduser.svg';
import ShopLogo from '../../img/suriya_logo.png';

const App = () => {
    const { dispatch } = useContext(Usercontext);
    const history = useHistory();
    // Men
    const [MenInputData, setMenInputData] = useState("");
    const [MenUploadedDataArray, setMenUploadedDataArray] = useState([]);

    const UploadMenData = () => {
        if (MenInputData != "") {

            setMenUploadedDataArray([...MenUploadedDataArray, MenInputData])
            setMenInputData("")
        }
    }
    const deleteMenItem = (index) => {

        const values = [...MenUploadedDataArray];
        values.splice(index, 1);
        setMenUploadedDataArray(values);

    }

    // Women
    const [WomenInputData, setWomenInputData] = useState("");
    const [WomenUploadedDataArray, setWomenUploadedDataArray] = useState([]);

    const UploadWomenData = () => {
        if (WomenInputData != "") {

            setWomenUploadedDataArray([...WomenUploadedDataArray, WomenInputData])
            setWomenInputData(" ")
        }
    }
    const deleteWomenItem = (index) => {

        const values = [...WomenUploadedDataArray];
        values.splice(index, 1);
        setWomenUploadedDataArray(values);

    }

    const UploadDynamicUserData = () => {
        fetch("/uploadDynamicUserData", {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                Men: MenUploadedDataArray,
                Women: WomenUploadedDataArray

            }),
        })
            .then((res) => res.json())
            .then((data) => {
                if (data.error) {
                    console.log("Data Upload Error");
                } else {
                    history.push("/");
                }
            })
            .catch((err) => {
                console.log(err);
            });
    };

    return (

        <div className="wrapper">
            <AdminNav />
            <main class="main">
                <header class="header">
                    <div class="header__wrapper">
                        <div className="search" >
                            <h4>Suriya Fashion World</h4>
                        </div>

                    </div>
                </header>

                <section className="section">
                    <header className="section__header">
                        <h2 className="section__title">Upload Form Lables</h2>

                    </header>
                    <div className="dynamicUpload_container_main">
                        <div className="dynamic_upload_nav_main">
                            <div className="dynamic_upload_nav_item dynamic_upload_nav_item_active">
                                <i className="fa fa-user-circle-o " aria-hidden="true"></i>
                                <span>Upload User Data</span>
                            </div>
                            <div className="dynamic_upload_nav_item">
                                <i className="fa fa-user-circle-o " aria-hidden="true"></i>
                                <span>Upload User Data</span>
                            </div>
                            <div className="dynamic_upload_nav_item">
                                <i className="fa fa-user-circle-o " aria-hidden="true"></i>
                                <span>Upload User Data</span>
                            </div>
                            <div className="dynamic_upload_nav_item">
                                <i className="fa fa-user-circle-o " aria-hidden="true"></i>
                                <span>Upload User Data</span>
                            </div>
                            <div className="dynamic_upload_nav_item">
                                <i className="fa fa-user-circle-o " aria-hidden="true"></i>
                                <span>Upload User Data</span>
                            </div>
                            <div className="dynamic_upload_nav_item">
                                <i className="fa fa-user-circle-o " aria-hidden="true"></i>
                                <span>Upload User Data</span>
                            </div>
                        </div>
                    </div>
                    <div className="dynamic_upload_form_main">
                        <div className="dynamic_upload_form_Items_main">
                            <div className="dynamic_upload_form_Items">
                                <h1>Men</h1>
                                <div className="dynamic_upload_form_Items_sub ">
                                    <input type="text" placeholder="Enter Dress Type" value={MenInputData} onChange={(e) => setMenInputData(e.target.value)} />
                                    <i class="fa fa-plus-circle " aria-hidden="true" onClick={UploadMenData} ></i>
                                </div>
                                <div className="dynamic_Items_sub_FilledData">
                                    {MenUploadedDataArray.map((result, index) => {
                                        return (
                                            <div key={index} className="dynamic_Items_sub_FilledData_item">
                                                <span >{result}</span>
                                                <i class="fa fa-minus-circle" onClick={() => deleteMenItem(index)} aria-hidden="true"></i>
                                            </div>

                                        );
                                    })}
                                </div>
                            </div>
                            <div className="dynamic_upload_form_Items">
                                <h1>Women</h1>
                                <div className="dynamic_upload_form_Items_sub ">
                                    <input type="text" placeholder="Enter Dress Type" value={WomenInputData} onChange={(e) => setWomenInputData(e.target.value)} />
                                    <i class="fa fa-plus-circle " aria-hidden="true" onClick={UploadWomenData} ></i>
                                </div>
                                <div className="dynamic_Items_sub_FilledData">
                                    {WomenUploadedDataArray.map((result, index) => {
                                        return (
                                            <div key={index} className="dynamic_Items_sub_FilledData_item">
                                                <span >{result}</span>
                                                <i class="fa fa-minus-circle" onClick={() => deleteWomenItem(index)} aria-hidden="true"></i>
                                            </div>

                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                        <div className="dynamic_upload_btn"><span onClick={UploadDynamicUserData}>Upload Data</span></div>
                    </div>

                </section>
            </main>
            <Admin_sidseView />
        </div >


    );
}

export default App;
