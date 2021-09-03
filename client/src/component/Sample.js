import React, { useState, useContext } from 'react';
import { Link, useHistory } from 'react-router-dom';

import '../css/OrderNotification.css';
const App = () => {


    return (
        <div className="Order-Notificaion-Container-main">
            <div class="a_wrapper">
                <div class="title">
                    User Order Details
                </div>
                <div class="form form-section-container-main">
                    <div className="form-section-container">

                        <div className="form-section1">
                            <div class="inputfield Order-InputField_style">
                                <label>Name</label>
                                <p className="Order-Input-Value Order-InputField_style"><strong>Rajajayaruban T</strong></p>

                            </div>


                            <div class="inputfield">
                                <label>Gender</label>
                                <p className="Order-Input-Value Order-InputField_style"><strong>Male</strong></p>

                            </div>
                            <div class="inputfield">
                                <label>Email Address</label>
                                <p className="Order-Input-Value Order-InputField_style"><strong>Email</strong></p>
                            </div>
                            <div class="inputfield">
                                <label>Phone Number</label>
                                <p className="Order-Input-Value Order-InputField_style"><strong>Phone</strong></p>

                            </div>
                            <div class="inputfield">
                                <label>Address</label>
                                <p className="Order-Input-Value Order-InputField_style Order-Input-Value-textarea  textarea"><strong>Adress</strong></p>
                            </div>
                            <div class="inputfield">
                                <label>Postal Code</label>
                                <p className="Order-Input-Value Order-InputField_style"><strong>Postal Code</strong></p>

                            </div>
                        </div>
                        <div className="form-section2">


                            <div class="inputfield">
                                <label>Department</label>
                                <p className="Order-Input-Value Order-InputField_style"><strong>Department</strong></p>

                            </div>
                            <div class="inputfield">
                                <label>Brand</label>
                                <p className="Order-Input-Value Order-InputField_style"><strong>Brand</strong></p>

                            </div>
                            <div class="inputfield">
                                <label>Price</label>
                                <p className="Order-Input-Value Order-InputField_style"><strong>Price</strong></p>

                            </div>
                            <div class="inputfield">
                                <label>Size</label>
                                <p className="Order-Input-Value Order-InputField_style"><strong>Size</strong></p>

                            </div>
                            <div class="inputfield">
                                <label>Material</label>
                                <p className="Order-Input-Value Order-InputField_style"><strong>Material</strong></p>

                            </div>
                            <div class="inputfield">
                                <label>Color</label>
                                <p className="Order-Input-Value Order-InputField_style"><strong>Color</strong></p>

                            </div>
                            <div class="inputfield">
                                <label>Notes</label>
                                <p className="Order-Input-Value Order-InputField_style Order-Input-Value-textarea  textarea"><strong>Notes</strong></p>
                            </div>

                        </div>
                    </div>

                    <div className="UserRequestBtn">
                        <button style={{ width: '180px', marginTop: '20px' }} class="banner__button" type="button">
                            Call User
                        </button>
                    </div>

                </div>
            </div>

        </div>

    );
}

export default App;