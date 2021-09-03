import React, { useEffect, useRef, useState } from "react";
import queryString from "query-string";
import { Link, useHistory } from "react-router-dom";
import Peer from "simple-peer";
import io from "socket.io-client";
import "../../css/videCallScreen.css";
import "../../css/RatingEmployee.css";
const socket = io.connect("http://localhost:4000");
function VideoScreen() {
    const history = useHistory();

    const [me, setMe] = useState("");
    const [stream, setStream] = useState();
    const [receivingCall, setReceivingCall] = useState(false);
    const [caller, setCaller] = useState("");
    const [callerSignal, setCallerSignal] = useState();
    const [callAccepted, setCallAccepted] = useState(false);
    const [idToCall, setIdToCall] = useState("");
    const [callEnded, setCallEnded] = useState(false);
    const [name, setName] = useState("");
    const [Muted, setMuted] = useState(false);
    const myVideo = useRef();
    const userVideo = useRef();
    const connectionRef = useRef();

    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({ video: true, audio: true })
            .then((stream) => {
                setStream(stream);
                myVideo.current.srcObject = stream;
            });
        socket.on("mee", (id) => {
            setMe(id);
            const customer = localStorage.getItem("customer");
            if (customer) {
                console.log(id);
                const userId = localStorage.getItem("id");
                socket.emit("coustomerId", { data: id, userId: userId });
            }
        });

        socket.on("callUser", (data) => {
            setReceivingCall(true);
            setCaller(data.from);
            setName(data.name);
            setCallerSignal(data.signal);
        });
        socket.on("callEnded", (data) => {
            const customer = localStorage.getItem("customer");
            const employee = localStorage.getItem("employee");
            if (customer) {
                handleClick();
            }
            if (employee) {
                history.push("/employee");
            }
        });
        // localStorage.removeItem("name")
        const userToCall = localStorage.getItem("customerToCall");
        setIdToCall(userToCall);
    }, []);
    function handleClick() {
        const modal = document.querySelector(".modal");
        const closeBtn = document.querySelector(".close");
        modal.classList.add("modalDisplay");
        modal.classList.remove("ratingModal");
        closeBtn.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }
    const close = () => {
        const modalRemove = document.getElementsByClassName("modal")[0];
        modalRemove.style.opacity = 0;
        setTimeout(() => {
            modalRemove.style.display = "none";
        }, 1000);
    };
    const RatingFn = (no) => {
        for (var i = 0; i < no; i++) {
            const raingstar = document.getElementsByClassName(`star-item-${i + 1}`);
            raingstar[0].classList.add("active");
            var colorVal = 1 - (no * 2) / 10;
            const image = document.getElementsByClassName("top-img-container")[0];
            image.style.filter = "grayscale(" + colorVal + ")";
        }
        for (var i = no + 1; i < 6; i++) {
            const raingstarNonActive = document.getElementsByClassName(
                `star-item-${i}`
            );
            if (raingstarNonActive[0].classList[2] == "active") {
                raingstarNonActive[0].classList.remove("active");
            }
        }
    };
    const ratingDisplay = (no) => {
        const ratingNo = document.getElementById("vote");
        ratingNo.childNodes[0].innerHTML = no;
    };
    const callUser = (id) => {
        console.log(id);
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream,
        });
        peer.on("signal", (data) => {
            console.log(data);
            socket.emit("callUser", {
                userToCall: id,
                signalData: data,
                from: me,
                name: name,
            });
        });
        peer.on("stream", (stream) => {
            userVideo.current.srcObject = stream;
        });
        socket.on("callAccepted", (signal) => {
            setCallAccepted(true);
            peer.signal(signal);
        });

        connectionRef.current = peer;
    };
    const disConnectCall = (id) => {
        console.log(id);
        socket.emit("callEnd", {
            id: id,
        });
    };

    const answerCall = () => {
        setCallAccepted(true);
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream,
        });
        peer.on("signal", (data) => {
            console.log(data, caller);
            socket.emit("answerCall", { signal: data, to: caller });
        });
        peer.on("stream", (stream) => {
            console.log(stream);
            userVideo.current.srcObject = stream;
        });

        peer.signal(callerSignal);
        connectionRef.current = peer;
    };

    const leaveCall = () => {
        setCallEnded(true);
        connectionRef.current.destroy();
        const userToCall = localStorage.getItem("customerToCall");
        disConnectCall(caller);
        disConnectCall(userToCall);
        const customer = localStorage.getItem("customer");
        const employee = localStorage.getItem("employee");
        if (customer) {
        }
        if (employee) {
            history.push("/");
        }
        // window.location.reload()
    };

    // Animation
    const expand = () => {
        document.getElementsByClassName("right-side")[0].classList.add("show");
        document.getElementsByClassName("expand-btn")[0].classList.remove("show");
    };
    // $(".expand-btn").click(function () {
    //   $(".right-side").addClass("show");
    //   $(this).removeClass("show");
    // });
    const inpand = () => {
        document.getElementsByClassName("right-side")[0].classList.remove("show");
        document.getElementsByClassName("expand-btn")[0].classList.add("show");
    };
    return (
        <div className="videScreen-main-Container">
            <div className="app-container">
                <div style={{ marginLeft: "20px" }}>
                    {/* <input
                        placeholder="set user Id"
                        value={idToCall}
                        onChange={(e) => setIdToCall(e.target.value)}
                    />
                    <input
                        placeholder="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        style={{ marginBottom: "20px" }}
                    /> */}

                    <div>
                        {receivingCall && !callAccepted ? (
                            <div className="caller-wrapper">
                                <div className="caller">
                                    <h1>Surya Fashion World is OnLine</h1>
                                    <button onClick={answerCall}>
                                        <i class="fa fa-phone fa-5x" aria-hidden="true"></i>
                                        Answer
                                    </button>
                                </div>
                            </div>
                        ) : null}
                    </div>
                </div>
                <div className="app-main">
                    <div className="video-call-wrapper">
                        <div className="video-participant">
                            {callAccepted && !callEnded ? (
                                <video
                                    playsInline
                                    ref={userVideo}
                                    autoPlay
                                    className="video-participant-me"
                                />
                            ) : (
                                <img
                                    className="video-participant-me"
                                    src="https://images.unsplash.com/photo-1581824283135-0666cf353f35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1276&q=80"
                                    alt="participant"
                                />
                            )}
                        </div>
                        <div className="video-participant2">
                            {stream && (
                                <video
                                    playsInline
                                    muted={Muted == true ? true : false}
                                    ref={myVideo}
                                    autoPlay
                                    className="video-participant-other"
                                />
                            )}
                        </div>
                    </div>
                    <div className="video-call-actions ">
                        <button
                            className="video-action-button mic"
                            onClick={() => {
                                Muted ? setMuted(false) : setMuted(true);
                                console.log(Muted);
                            }}
                        ></button>
                        <button className="video-action-button camera"></button>
                        <button className="video-action-button maximize"></button>
                        {callAccepted && !callEnded ? (
                            <button
                                className="video-action-button endcall"
                                onClick={() => {
                                    leaveCall();
                                }}
                            >
                                End Call
                            </button>
                        ) : (
                            <button
                                className="video-action-button endcall"
                                onClick={() => callUser(idToCall)}
                            >
                                Call User
                            </button>
                        )}

                        <button className="video-action-button magnifier">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-zoom-in"
                                viewBox="0 0 24 24"
                            >
                                <circle cx="11" cy="11" r="8" />
                                <path d="M21 21l-4.35-4.35M11 8v6M8 11h6" />
                            </svg>
                            <span>100%</span>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="feather feather-zoom-out"
                            >
                                <circle cx="11" cy="11" r="8" />
                                <line x1="21" y1="21" x2="16.65" y2="16.65" />
                                <line x1="8" y1="11" x2="14" y2="11" />
                            </svg>
                        </button>
                    </div>
                </div>
                {/* <div className="right-side">
          <button className="btn-close-right" onClick={inpand}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              className="feather feather-x-circle"
              viewBox="0 0 24 24"
            >
              <defs></defs>
              <circle cx="12" cy="12" r="10"></circle>
              <path d="M15 9l-6 6M9 9l6 6"></path>
            </svg>
          </button>
          <div className="chat-container">
            <div className="chat-header">
              <button className="chat-header-button">Chat Box</button>
            </div>
            <div className="chat-area">
              <div className="message-wrapper">
                <div className="profile-picture">
                  <img
                    src="https://images.unsplash.com/photo-1581824283135-0666cf353f35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1276&q=80"
                    alt="pp"
                  />
                </div>
                <div className="message-content">
                  <p className="name">Ryan Patrick</p>
                  <div className="message">Helloo team!😍</div>
                </div>
              </div>
              <div className="message-wrapper">
                <div className="profile-picture">
                  <img
                    src="https://images.unsplash.com/photo-1566821582776-92b13ab46bb4?ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
                    alt="pp"
                  />
                </div>
                <div className="message-content">
                  <p className="name">Andy Will</p>
                  <div className="message">
                    Hello! Can you hear me?🤯{" "}
                    <a className="mention">@ryanpatrick</a>
                  </div>
                </div>
              </div>
              <div className="message-wrapper">
                <div className="profile-picture">
                  <img
                    src="https://images.unsplash.com/photo-1600207438283-a5de6d9df13e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1234&q=80"
                    alt="pp"
                  />
                </div>
                <div className="message-content">
                  <p className="name">Jessica Bell</p>
                  <div className="message">Hi team! Let's get started it.</div>
                </div>
              </div>
              <div className="message-wrapper reverse">
                <div className="profile-picture">
                  <img
                    src="https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                    alt="pp"
                  />
                </div>
                <div className="message-content">
                  <p className="name">Emmy Lou</p>
                  <div className="message">Good morning!🌈</div>
                </div>
              </div>
              <div className="message-wrapper">
                <div className="profile-picture">
                  <img
                    src="https://images.unsplash.com/photo-1576110397661-64a019d88a98?ixlib=rb-1.2.1&auto=format&fit=crop&w=1234&q=80"
                    alt="pp"
                  />
                </div>
                <div className="message-content">
                  <p className="name">Tim Russel</p>
                  <div className="message">New design document⬇️</div>
                  <div className="message-file">
                    <div className="icon sketch">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 512 512"
                      >
                        <path
                          fill="#ffd54f"
                          d="M96 191.02v-144l160-30.04 160 30.04v144z"
                        />
                        <path
                          fill="#ffecb3"
                          d="M96 191.02L256 16.98l160 174.04z"
                        />
                        <path fill="#ffa000" d="M0 191.02l256 304 256-304z" />
                        <path fill="#ffca28" d="M96 191.02l160 304 160-304z" />
                        <g fill="#ffc107">
                          <path d="M0 191.02l96-144v144zM416 47.02v144h96z" />
                        </g>
                      </svg>
                    </div>
                    <div className="file-info">
                      <div className="file-name">NewYear.sketch</div>
                      <div className="file-size">120 MB</div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="message-wrapper">
                <div className="profile-picture">
                  <img
                    src="https://images.unsplash.com/photo-1581824283135-0666cf353f35?ixlib=rb-1.2.1&auto=format&fit=crop&w=1276&q=80"
                    alt="pp"
                  />
                </div>
                <div className="message-content">
                  <p className="name">Ryan Patrick</p>
                  <div className="message">Hi team!❤️</div>
                  <div className="message">
                    I downloaded the file <a className="mention">@timrussel</a>
                  </div>
                </div>
              </div>
              <div className="message-wrapper reverse">
                <div className="profile-picture">
                  <img
                    src="https://images.unsplash.com/photo-1500917293891-ef795e70e1f6?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1650&q=80"
                    alt="pp"
                  />
                </div>
                <div className="message-content">
                  <p className="name">Emmy Lou</p>
                  <div className="message">Woooww! Awesome❤️</div>
                </div>
              </div>
            </div>
            <div className="chat-typing-area-wrapper">
              <div className="chat-typing-area">
                <input
                  type="text"
                  placeholder="Type your meesage..."
                  className="chat-input"
                />
                <button className="send-button">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="feather feather-send"
                    viewBox="0 0 24 24"
                  >
                    <path d="M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" />
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>
        <button
          className="expand-btn"
          onClick={() => {
            expand();
          }}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-message-circle"
          >
            <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          </svg>
        </button> */}
            </div>
            <div
                className="modal  ratingModal in"
                id="ratingModal"
                tabindex="-1"
                role="dialog"
                aria-labelledby="ratingModalLabel"
            >
                <div className="modal-dialog" role="document">
                    <div className="modal-content">
                        <button
                            type="button"
                            className="close"
                            data-dismiss="modal"
                            aria-label="Close"
                            onClick={close}
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                        <div className="modal-body text-center">
                            <div className="top-img-container"></div>
                            <h3>How well the service is</h3>
                            <h1 id="vote">
                                <span>0</span> / 5
                            </h1>
                            <div className="stars-container">
                                <span
                                    className="star-item star-item-1"
                                    data-id="1"
                                    onClick={() => {
                                        RatingFn(1);
                                        ratingDisplay(1);
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="100"
                                        height="100"
                                        viewBox="0 0 100 100"
                                    >
                                        <path
                                            className="cls-1"
                                            d="M50,0L66.478,31.427,99.993,38.2,76.663,64.389,80.9,100,50,84.759,19.1,100l4.235-35.608L0.007,38.2l33.515-6.77L50,0"
                                        />
                                    </svg>
                                </span>
                                <span
                                    className="star-item star-item-2"
                                    data-id="2"
                                    onClick={() => {
                                        RatingFn(2);
                                        ratingDisplay(2);
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="100"
                                        height="100"
                                        viewBox="0 0 100 100"
                                    >
                                        <path
                                            className="cls-1"
                                            d="M50,0L66.478,31.427,99.993,38.2,76.663,64.389,80.9,100,50,84.759,19.1,100l4.235-35.608L0.007,38.2l33.515-6.77L50,0"
                                        />
                                    </svg>
                                </span>
                                <span
                                    className="star-item star-item-3"
                                    data-id="3"
                                    onClick={() => {
                                        RatingFn(3);
                                        ratingDisplay(3);
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="100"
                                        height="100"
                                        viewBox="0 0 100 100"
                                    >
                                        <path
                                            className="cls-1"
                                            d="M50,0L66.478,31.427,99.993,38.2,76.663,64.389,80.9,100,50,84.759,19.1,100l4.235-35.608L0.007,38.2l33.515-6.77L50,0"
                                        />
                                    </svg>
                                </span>
                                <span
                                    className="star-item star-item-4"
                                    data-id="4"
                                    onClick={() => {
                                        RatingFn(4);
                                        ratingDisplay(4);
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="100"
                                        height="100"
                                        viewBox="0 0 100 100"
                                    >
                                        <path
                                            className="cls-1"
                                            d="M50,0L66.478,31.427,99.993,38.2,76.663,64.389,80.9,100,50,84.759,19.1,100l4.235-35.608L0.007,38.2l33.515-6.77L50,0"
                                        />
                                    </svg>
                                </span>
                                <span
                                    className="star-item star-item-5"
                                    data-id="5"
                                    onClick={() => {
                                        RatingFn(5);
                                        ratingDisplay(5);
                                    }}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="100"
                                        height="100"
                                        viewBox="0 0 100 100"
                                    >
                                        <path
                                            className="cls-1"
                                            d="M50,0L66.478,31.427,99.993,38.2,76.663,64.389,80.9,100,50,84.759,19.1,100l4.235-35.608L0.007,38.2l33.515-6.77L50,0"
                                        />
                                    </svg>
                                </span>
                            </div>
                        </div>
                        <div className="modal-footer">
                            <button
                                type="button"
                                className="btn btn-default btn-block"
                                data-dismiss="modal"
                            >
                                Rate
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default VideoScreen;
