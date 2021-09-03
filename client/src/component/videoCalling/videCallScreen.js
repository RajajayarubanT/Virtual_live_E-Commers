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
        history.push("/PurchasedOrder");
      }
    });
    // localStorage.removeItem("name")
    const userToCall = localStorage.getItem("customerToCall");
    setIdToCall(userToCall);
  }, []);
  function handleClick() {
    const modal = document.getElementsByClassName("modal")[0];
    if (modal) {
      console.log(modal);
      const closeBtn = document.querySelector(".close");
      modal.classList.add("modalDisplay");
      modal.classList.remove("ratingModal");
      closeBtn.addEventListener("click", () => {
        modal.style.display = "none";
      });
    } else {
      console.log("Hi");
    }
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
      handleClick();
    }
    if (employee) {
      history.push("/PurchasedOrder");
    }
    // window.location.reload()
  };

  // Animation

  return (
    <div className="videScreen-main-Container">
      <div className="app-container">
        <div style={{ marginLeft: "20px" }}>
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
      </div>
      <div
        className="modal  ratingModal in"
        id="ratingModal"
        tabIndex="-1"
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
