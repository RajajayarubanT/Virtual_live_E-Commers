
import React, { useState, useEffect, useContext } from "react";
import '../../css/index.css'
import '../../css/admin.css'
import '../../css/normalize.css'
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
    const Admin_Name = localStorage.getItem("name")



    return (

        <div className="wrapper">
            <AdminNav />
            <AdminMainContent />
            <Admin_sidseView />
        </div >


    );
}

export default App;
