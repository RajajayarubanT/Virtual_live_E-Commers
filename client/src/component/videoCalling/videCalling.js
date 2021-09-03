
import React, { useEffect, useRef, useState } from "react"
import Peer from "simple-peer"
import io from "socket.io-client"



const socket = io.connect('http://localhost:4000')
function App() {
    const [me, setMe] = useState("")
    const [stream, setStream] = useState()
    const [receivingCall, setReceivingCall] = useState(false)
    const [caller, setCaller] = useState("")
    const [callerSignal, setCallerSignal] = useState()
    const [callAccepted, setCallAccepted] = useState(false)
    const [idToCall, setIdToCall] = useState("")
    const [callEnded, setCallEnded] = useState(false)
    const [name, setName] = useState("")
    const myVideo = useRef()
    const userVideo = useRef()
    const connectionRef = useRef()
    useEffect(() => {

        navigator.mediaDevices.getUserMedia({ video: true, audio: true }).then((stream) => {
            setStream(stream)
            myVideo.current.srcObject = stream

        })
        socket.on("me", (id) => {
            setMe(id)
        })

        socket.on("callUser", (data) => {
            setReceivingCall(true)
            setCaller(data.from)
            setName(data.name)
            setCallerSignal(data.signal)
        })
        socket.on("callEnded", (data) => {
            setCallEnded(true)
            console.log(data)
        })



    }, [])

    const callUser = (id) => {
        const peer = new Peer({
            initiator: true,
            trickle: false,
            stream: stream
        })
        peer.on("signal", (data) => {
            socket.emit("callUser", {
                userToCall: id,
                signalData: data,
                from: me,
                name: name,

            })
        })
        peer.on("stream", (stream) => {

            userVideo.current.srcObject = stream

        })
        socket.on("callAccepted", (signal) => {
            setCallAccepted(true)
            peer.signal(signal)
        })

        connectionRef.current = peer
    }
    const disConnectCall = (id) => {
        console.log(id)
        socket.emit("callEnd", {
            id: id
        })
    }

    const answerCall = () => {
        setCallAccepted(true)
        const peer = new Peer({
            initiator: false,
            trickle: false,
            stream: stream
        })
        peer.on("signal", (data) => {
            socket.emit("answerCall", { signal: data, to: caller })
        })
        peer.on("stream", (stream) => {
            userVideo.current.srcObject = stream
        })

        peer.signal(callerSignal)
        connectionRef.current = peer
    }

    const leaveCall = () => {
        setCallEnded(true)
        connectionRef.current.destroy()
        if (idToCall) {
            disConnectCall(idToCall)

        } else {
            disConnectCall(caller)

        }

    }

    return (

        <div style={{ width: '100%', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection: 'column' }}>
            <div className="video-container">
                <div className="video">
                    {stream && <video playsInline muted ref={myVideo} autoPlay style={{ width: "1000px" }} />}
                </div>
                <div className="video">
                    {callAccepted && !callEnded ?
                        <video playsInline ref={userVideo} autoPlay style={{ width: "300px" }} /> :
                        null}
                </div>
            </div>
            <div className="myId">
                <input
                    placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    style={{ marginBottom: "20px" }}
                />
                <h1>{me}</h1>
                {/* <CopyToClipboard text={me} style={{ marginBottom: "2rem" }}>
                        <Button variant="contained" color="primary" startIcon={<AssignmentIcon fontSize="large" />}>
                            Copy ID
                        </Button>
                    </CopyToClipboard> */}

                <input
                    placeholder="set user Id"
                    value={idToCall}
                    onChange={(e) => setIdToCall(e.target.value)}
                />
                <div className="call-button">
                    {callAccepted && !callEnded ? (
                        <button onClick={() => {
                            leaveCall();

                        }}>
                            End Call
                        </button>
                    ) : (
                        <button onClick={() => callUser(idToCall)}>
                            Call User
                        </button>
                    )}
                    {idToCall}
                </div>
            </div>
            <div>
                {receivingCall && !callAccepted ? (
                    <div className="caller">
                        <h1 >{name} is calling...</h1>
                        <button onClick={answerCall}>
                            Answer
                        </button>
                    </div>
                ) : null}
            </div>
        </div>

    )
}

export default App
