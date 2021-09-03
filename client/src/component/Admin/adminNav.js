
import React, { useState, useEffect, useContext } from "react";
import '../../css/index.css'
import '../../css/admin.css'
import '../../css/normalize.css'

const App = () => {



    return (

        <nav className="nav">
            <ul className="nav__list" role="menubar">
                <li className="nav__item nav__item--isActive">
                    <a
                        href="/"
                        className="nav__link focus--box-shadow tooltip"
                        role="menuitem"
                        aria-label="Home"
                    >
                        <div className="nav__icon ">
                            <i class="fa fa-home " style={{ color: '#fff', fontSize: '30px' }} aria-hidden="true"></i>
                        </div>
                        <span class="tooltiptext">Tooltip text</span>
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
                        href="/DynamicUpload"
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


    );
}

export default App;
