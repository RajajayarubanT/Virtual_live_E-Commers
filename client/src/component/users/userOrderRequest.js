import React, { useState, useEffect, useContext } from "react";
import "../../css/index.css";
import "../../css/normalize.css";
import "../../css/employee.css";
import { Link, useHistory } from "react-router-dom";
import { Usercontext } from "../../App";
// Images
import Dashbord from "../../img/dashboard.svg";
import AddUser from "../../img/adduser.svg";
import Callhistory from "../../img/callhistory.svg";
import Profile from "../../img/seth-doyle-uJ8LNVCBjFQ-unsplash.jpg";

import io from "socket.io-client";
let socket;
const ENDPOINT = "http://localhost:4000/";
const App = () => {
  const { dispatch } = useContext(Usercontext);
  const history = useHistory();
  const [MenData, setMenData] = useState([]);
  const [WomenData, setWomenData] = useState([]);
  useEffect(() => {
    socket = io(ENDPOINT);
  }, [ENDPOINT]);

  // Order Data
  const [Name, setName] = useState("");
  const [Email, setEmail] = useState("");
  const [Gender, setGender] = useState("");
  const [Phone, setPhone] = useState("");
  const [Address, setAddress] = useState("");
  const [PinCode, setPinCode] = useState("");
  const [Dept, setDept] = useState("");
  const [Brand, setBrand] = useState("");
  const [Price, setPrice] = useState("");
  const [Size, setSize] = useState("");
  const [Material, setMaterial] = useState("");
  const [Color, setColor] = useState("");
  const [Notes, setNotes] = useState("");
  const [message, setMessage] = useState("");
  const [MenIdentity, setMenIdentity] = useState("");
  const [WomenIdentity, setWomenIdentity] = useState("");

  var arrayOfBlanks = {
    Name: Name,
    Gender: Gender,
    Phone: Phone,
    Dept: Dept,
    Brand: Brand,
    Price: Price,
    Size: Size,
    Material: Material,
    Color: Color,
    Notes: Notes,
  };

  const Blanks_Check = () => {
    for (var [keys, entries] of Object.entries(arrayOfBlanks)) {
      if (!entries) {
        var required = document.getElementById(keys);
        required.style.border = "1px solid red";
        required.setAttribute("placeholder", "Fill in the blanks");
      } else {
        var required = document.getElementById(keys);
        required.style.border = "1px solid #d5dbd9";
      }
    }
  };

  useEffect(() => {
    fetch("/viewDynamicUserData")
      .then((res) => res.json())
      .then((result) => {
        if (result[0]) {
          let Mendata = result[0].Men;
          let Womendata = result[0].Women;
          setMenData(Mendata);
          setWomenData(Womendata);
        }
      });

    console.log(MenIdentity);
    console.log(WomenIdentity);
  }, []);

  const GenderValue = (Gender) => {
    if (Gender == "male") {
      let Tru = "true";
      let Fasl = "false";
      setMenIdentity(Tru);
      setWomenIdentity(Fasl);
    }
    if (Gender == "female") {
      let Tru = "true";
      let Fasl = "false";
      setMenIdentity(Fasl);
      setWomenIdentity(Tru);
    }

    console.log(MenIdentity);
    console.log(WomenIdentity);
    // let Gen = document.getElementById('Gender')
    // let Deport = document.getElementById('Dept')

    // let Geb_Value = Gen.value
    // if (Geb_Value == "male") {
    //     Deport.innerHTML = ``

    //     MenData.map((res) => {
    //         let Option = document.createElement('option')
    //         Option.classList.add('men_option')
    //         Option.innerHTML = `${res}`

    //     })

    // }
    // if (Geb_Value == "female") {
    //     Deport.innerHTML = ``
    //     Deport.innerHTML = `
    //     <option value="">select</option>
    //     <option value="Midi_Dress">Midi Dress</option>
    //     <option value="Off_the_Shoulder">Off the Shoulder</option>
    //     <option value="Shift_Dress">Shift Dress</option>
    //     <option value="Bodycon_Dress">Bodycon Dress</option>
    //     <option value="A_Line_Dress">A-Line Dress</option>
    // `
    // }
  };
  const userId = localStorage.getItem("id");
  const orderRequestData = {
    userId: userId,
    Name: Name,
    Email: Email,
    Gender: Gender,
    Phone: Phone,
    Address: Address,
    PinCode: PinCode,
    Dept: Dept,
    Brand: Brand,
    Price: Price,
    Size: Size,
    Material: Material,
    Color: Color,
    Notes: Notes,
  };

  const postData = () => {
    if (orderRequestData) {
      socket.emit("orderRequest", orderRequestData);
      localStorage.setItem("customer", "true");
      UploadOrderData_DB();
    }
  };

  const UploadOrderData_DB = () => {
    fetch("/customer-OrderData", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        orderRequestData: orderRequestData,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.error) {
          console.log(" Upload Error");
        } else {
          console.log(" OrderData Upload Succesfully");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <div class="wrapper" id="UserMainContent">
      <nav className="nav">
        <ul className="nav__list" role="menubar">
          <li className="nav__item nav__item--isActive">
            <a
              href="/admin"
              className="nav__link focus--box-shadow"
              role="menuitem"
              aria-label="Home"
            >
              <div className="nav__icon">
                <i
                  class="fa fa-home "
                  style={{ color: "#fff", fontSize: "30px" }}
                  aria-hidden="true"
                ></i>
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
              <i
                class="fa fa-address-book-o nav__iconFaFaicon"
                style={{ fontSize: "30px" }}
                aria-hidden="true"
              ></i>
            </a>
          </li>
          <li className="nav__item">
            <a
              href="#"
              className="nav__link focus--box-shadow"
              role="menuitem"
              aria-label="Informational messages"
            >
              <i
                className="fa fa-cloud-upload nav__iconFaFaicon"
                style={{ fontSize: "30px" }}
                aria-hidden="true"
              ></i>
            </a>
          </li>
          <li className="nav__item">
            <a
              href="#"
              className="nav__link focus--box-shadow"
              role="menuitem"
              aria-label="Collections"
            >
              <i
                class="fa fa-check-circle nav__iconFaFaicon"
                style={{ fontSize: "30px" }}
                aria-hidden="true"
              ></i>
            </a>
          </li>
          <li className="nav__item">
            <a
              href="#"
              className="nav__link focus--box-shadow"
              role="menuitem"
              aria-label="Analytics"
            >
              <i
                class="fa fa-pie-chart nav__iconFaFaicon"
                style={{ fontSize: "30px" }}
                aria-hidden="true"
              ></i>
            </a>
          </li>
        </ul>
      </nav>
      <main class="main">
        <header class="header">
          <div class="header__wrapper">
            <div className="search">
              <h4>Suriya Fashion World</h4>
            </div>
          </div>
        </header>

        <div class="a_wrapper">
          <div class="title">Order Details</div>
          <div class="form form-section-container-main">
            <div className="form-section-container">
              <div className="form-section1">
                <div class="inputfield">
                  <label>Name</label>
                  <input
                    type="text"
                    class="input"
                    onChange={(e) => setName(e.target.value)}
                    name="name"
                    id="Name"
                  />
                </div>

                <div class="inputfield">
                  <label>Gender</label>
                  <div class="custom_select">
                    <select
                      onChange={(e) => {
                        setGender(e.target.value);
                        GenderValue(e.target.value);
                      }}
                      name="gender"
                      id="Gender"
                    >
                      <option value="">Select</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                    </select>
                  </div>
                </div>
                <div class="inputfield">
                  <label>Email Address</label>
                  <input
                    type="text"
                    class="input"
                    onChange={(e) => setEmail(e.target.value)}
                    name="email"
                  />
                </div>
                <div class="inputfield">
                  <label>Phone Number</label>
                  <input
                    type="text"
                    class="input"
                    onChange={(e) => setPhone(e.target.value)}
                    name="Phone"
                    id="Phone"
                  />
                </div>
                <div class="inputfield">
                  <label>Address</label>
                  <textarea
                    class="textarea"
                    onChange={(e) => setAddress(e.target.value)}
                    name="Address"
                  ></textarea>
                </div>
                <div class="inputfield">
                  <label>Postal Code</label>
                  <input
                    type="text"
                    class="input"
                    onChange={(e) => setPinCode(e.target.value)}
                    name="PinCode"
                  />
                </div>
              </div>
              <div className="form-section2">
                <div class="inputfield">
                  <label>Department</label>
                  <div class="custom_select">
                    <select
                      onChange={(e) => setDept(e.target.value)}
                      name="Dept"
                      id="Dept"
                    >
                      {MenIdentity == "true" ? (
                        MenData.map((result, index) => {
                          return <option key={index}>{result}</option>;
                        })
                      ) : WomenIdentity == "true" ? (
                        WomenData.map((result, index) => {
                          return <option key={index}>{result}</option>;
                        })
                      ) : (
                        <option>Select Gender</option>
                      )}
                    </select>
                    <div> </div>
                  </div>
                </div>
                <div class="inputfield">
                  <label>Brand</label>
                  <input
                    type="text"
                    class="input"
                    onChange={(e) => setBrand(e.target.value)}
                    name="Brand"
                    id="Brand"
                  />
                </div>
                <div class="inputfield">
                  <label>Price</label>
                  <input
                    type="text"
                    class="input"
                    onChange={(e) => setPrice(e.target.value)}
                    name="Price"
                    id="Price"
                  />
                </div>
                <div class="inputfield">
                  <label>Size</label>
                  <input
                    type="text"
                    class="input"
                    onChange={(e) => setSize(e.target.value)}
                    name="Size"
                    id="Size"
                  />
                </div>
                <div class="inputfield">
                  <label>Material</label>
                  <input
                    type="text"
                    class="input"
                    onChange={(e) => setMaterial(e.target.value)}
                    name="Material"
                    id="Material"
                  />
                </div>
                <div class="inputfield">
                  <label>Color</label>
                  <input
                    type="text"
                    class="input"
                    onChange={(e) => setColor(e.target.value)}
                    name="Color"
                    id="Color"
                  />
                </div>
                <div class="inputfield">
                  <label>Notes</label>
                  <textarea
                    class="textarea"
                    onChange={(e) => setNotes(e.target.value)}
                    name="Notes"
                    id="Notes"
                  ></textarea>
                </div>
              </div>
            </div>

            <div class="inputfield terms" style={{ marginTop: "10px" }}>
              <label class="check">
                <input type="checkbox" />
                <span class="checkmark"></span>
              </label>
              <p>Agreed to terms and conditions</p>
            </div>
            <div className="UserRequestBtn">
              {Name.length > 0 &&
              Gender.length > 0 &&
              Phone.length > 0 &&
              Dept.length > 0 &&
              Brand.length > 0 &&
              Price.length > 0 &&
              Size.length > 0 &&
              Material.length > 0 &&
              Color.length > 0 &&
              Notes.length > 0 ? (
                <a href="/video">
                  <button
                    style={{ width: "180px" }}
                    class="banner__button"
                    onClick={postData}
                    type="button"
                  >
                    Request Call
                  </button>
                </a>
              ) : (
                <button
                  style={{ width: "180px", opacity: "0.7" }}
                  class="banner__button"
                  onClick={Blanks_Check}
                  type="button"
                >
                  Request Call
                </button>
              )}
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
                <path d="M17,11H9.41l3.3-3.29a1,1,0,1,0-1.42-1.42l-5,5a1,1,0,0,0-.21.33,1,1,0,0,0,0,.76,1,1,0,0,0,.21.33l5,5a1,1,0,0,0,1.42,0,1,1,0,0,0,0-1.42L9.41,13H17a1,1,0,0,0,0-2Z" />
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
                <path d="M18,13.18V10a6,6,0,0,0-5-5.91V3a1,1,0,0,0-2,0V4.09A6,6,0,0,0,6,10v3.18A3,3,0,0,0,4,16v2a1,1,0,0,0,1,1H8.14a4,4,0,0,0,7.72,0H19a1,1,0,0,0,1-1V16A3,3,0,0,0,18,13.18ZM8,10a4,4,0,0,1,8,0v3H8Zm4,10a2,2,0,0,1-1.72-1h3.44A2,2,0,0,1,12,20Zm6-3H6V16a1,1,0,0,1,1-1H17a1,1,0,0,1,1,1Z" />
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
              <a class="statistics__entry-description" href="#">
                Total Employees
              </a>
              <span class="statistics__entry-quantity">10K</span>
            </li>
            <li class="statistics__entry">
              <a class="statistics__entry-description" href="#">
                Total Users
              </a>
              <span class="statistics__entry-quantity">50K</span>
            </li>
            <li class="statistics__entry">
              <a class="statistics__entry-description" href="#">
                Total Stocks
              </a>
              <span class="statistics__entry-quantity">480K</span>
            </li>
            <li class="statistics__entry">
              <a class="statistics__entry-description" href="#">
                Active Users
              </a>
              <span class="statistics__entry-quantity">10K</span>
            </li>
            <li class="statistics__entry">
              <a class="statistics__entry-description" href="#">
                Feedback
              </a>
              <span class="statistics__entry-quantity">50K</span>
            </li>
          </ul>

          <button
            class="banner__button"
            type="button"
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
    </div>
  );
};

export default App;
