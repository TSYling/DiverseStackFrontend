import { useEffect, useRef } from "react";
import stomp from "stompjs";
import sockJs from "sockjs-client/dist/sockjs.min.js";
import configJson from "../config/config.json";
// webRtc https://webrtc.org/getting-started/media-devices?hl=zh-cn

const config = {
  iceTransportPolicy:"relay",
  iceServers: [
    { urls: "stun:6884k081i1.yicp.fun:3478" },
    {
      urls: [
        "turn:6884k081i1.yicp.fun:3478"
        // "turn:6884k081i1.yicp.fun:3478?transport=udp",
        // "turn:6884k081i1.yicp.fun:3478?transport=tcp"
      ],
      username: "king",
      credential: "king",
    },
  ],
};
const config2 = null;

const TestComponent = () => {
  const videoRef = useRef();
  const videoRef2 = useRef();
  useEffect(() => {
    document.title = "test";
    // const constraints = {
    //   video: true,
    //   audio: true,
    // };
    // navigator.mediaDevices
    //   .getUserMedia(constraints)
    //   .then((stream) => {
    //     console.log("Got MediaStream:", stream);
    //   })
    //   .catch((error) => {
    //     console.error("Error accessing media devices.", error);
    //   });
    // navigator.mediaDevices.getDisplayMedia({
    //   video: true,
    //   audio: true,
    // }).then(
    //   (stream) => {
    //     console.log("Got MediaStream:", stream);
    //   },
    //   (error) => {
    //     console.error("Error accessing media devices.", error);
    //   }
    // );
    /**
     *
     * @param {audio||video} type
     * @param {funciton } callback
     * 查询已连接设备 用于用户多设备时选择
     */
    // function getConnectedDevices(type, callback) {
    //   navigator.mediaDevices.enumerateDevices().then((devices) => {
    //     const filtered = devices.filter((device) => device.kind === type);
    //     callback(filtered);
    //   });
    // }

    // getConnectedDevices("videoinput", (cameras) =>
    //   console.log("Cameras found", cameras)
    // );

    // playVideoFromCamera();

    // var video = document.querySelector("video");
  }, []);
  async function playVideoFromCamera() {
    try {
      const constraints = {
        video: {
          cursor: "never",
          displaySurface: "window",
        },
        audio: false,
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const videoElement = videoRef.current;
      videoElement.srcObject = stream;
      const stream2 = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true,
      });
      const videoElement2 = videoRef2.current;
      videoElement2.srcObject = stream2;
    } catch (error) {
      console.error("Error opening video camera.", error);
    }

    const signalingChannel = new SignalingChannel(remoteClientId);
    async function makeCall() {
      const configuration = {
        iceServers: [
          {
            urls: [
              "turn:stun.l.google.com:19302?transport=udp",
              "turn:stun.l.google.com:19302?transport=tcp",
            ],
            username: "king",
            credential: "king",
          },
          {
            urls: ["stun:stun.l.google.com:19302"],
          },
        ],
      };
      const peerConnection = new RTCPeerConnection(configuration);
      signalingChannel.addEventListener("message", async (message) => {
        if (message.answer) {
          const remoteDesc = new RTCSessionDescription(message.answer);
          await peerConnection.setRemoteDescription(remoteDesc);
        }
      });
      const offer = await peerConnection.createOffer();
      await peerConnection.setLocalDescription(offer);
      signalingChannel.send({ offer: offer });
    }
  }

  var webSocket = null;
  const makeConn = () => {
    webSocket = new WebSocket("ws://localhost:8080/ws");
    // webSocket = new WebSocket(
    //   "ws://6884k081i1.yicp.fun:10087/ws"
    // );
    webSocket.onopen = function () {
      console.log("Connection is open now!");
    };
    webSocket.onmessage = function (event) {
      console.log("Message is received:", event.data);
    };
    webSocket.onclose = function (event) {
      console.log("Connection is closed now!", event.data);
    };
    webSocket.onerror = function (error) {
      console.log("Error:", error);
    };
  };
  const send = () => {
    webSocket.send(JSON.stringify({ message: "Hello!" }));
  };
  var client = null;
  const makeConn2 = () => {
    const ws = new sockJs(configJson.baseURL+"/api/webSocket");
    client = stomp.over(ws);
    client.connect(
      {},
      function (frame) {
        console.log(frame);
        client.subscribe("/user/topic/status", function (x) {
          console.log(x);
        });
      },
      (error) => {
        console.log("error");
        console.log(error);
      }
    );

    // client.subscribe("/topic/greetings", function (greeting) {
    //   console.log(greeting.body);
    // });
  };
  const send2 = () => {
    client.send(
      "/app/room/createRoom",
      { 123: "123" },
      JSON.stringify({ message: "Hello!" })
    );
  };
  const sub = () => {
    // client.subscribe("/topic/test", function (x) {
    //   console.log(x);
    // });
    client.subscribe("/topic/subscribeTest", function (x) {
      console.log(x);
    });
  };
  const createRoom = () => {
    client.send("/app/room/createRoom/;';'", {}, "123123");
  };
  const disconnect = () => {
    client.disconnect(() => {
      console.log("已断开连接");
    });
  };
  var roomId;
  var pass;
  var roomName;
  const joinInRoom = () => {
    roomName = client.subscribe(
      "/room/" + roomId,
      (x) => {
        console.log(x);
      },
      { password: pass }
    );
  };
  const dissolveRoom = () => {
    client.send(
      "/app/room/dissolveRoom/" + roomId,
      {},
      JSON.stringify({ message: "Hello!" })
    );
  };
  const send3 = () => {
    client.send(
      "/app/room/send/" + roomId,
      {},
      JSON.stringify({ message: "Hello!" })
    );
  };
  var url;
  var payload;
  const sendCustomly = () => {
    client.send(url, {}, payload);
  };
  const unSub = () => {
    roomName.unsubscribe();
  };
  var peerConnections = [];

  const createP2P = async () => {
    const peerConnection = new RTCPeerConnection(config2);
    peerConnection.uniqueId = new Date().getTime().toString(16);
    peerConnection.addEventListener("icecandidate", (event) => {
      console.log("candidate");
      console.log(event);
      if (event.candidate) {
        console.log(event.candidate);
        client.send(
          "/app/room/sendSDK/" + roomId,
          {},
          JSON.stringify({
            iceCandidate: {
              uniqueId: peerConnection.uniqueId,
              data: event.candidate,
            },
          })
        );
      }
    });
    peerConnection.addEventListener("connectionstatechange", (event) => {
      console.log("statechange");
      if (peerConnection.connectionState === "connected") {
        // Peers connected!
        console.log("Peers connected!");
      }
    });
    localStream.getTracks().forEach((track) => {
      peerConnection.addTrack(track, localStream);
    });
    peerConnection.addEventListener("track", (event) => { 
      const [remoteStream] = event.streams;
      videoRef2.current.srcObject = remoteStream;
    })
    peerConnections.push(peerConnection);
    const offer = await peerConnection.createOffer();
    await peerConnection.setLocalDescription(offer);
    await client.send(
      "/app/room/sendSDK/" + roomId,
      {},
      JSON.stringify({ offer: { off:offer,uniqueId:peerConnection.uniqueId } })
    );
  };
  const recive = () => {
    client.subscribe("/user/room/SDK/" + roomId, async function (x) {
      const payload = x.body;
      const off = JSON.parse(payload).offer;
      const ans = JSON.parse(payload).answer;
      const can = JSON.parse(payload).iceCandidate;
      console.log(ans);
      if (ans) {
        const remoteDesc = new RTCSessionDescription(ans);
        await peerConnections[
          peerConnections.length - 1
        ].setRemoteDescription(remoteDesc);
      }
      //-----------------------------
      console.log(off);
      if (off) {
        const peerConnection = new RTCPeerConnection(config2);
        peerConnection.uniqueId = off.uniqueId;
        peerConnection.addEventListener("icecandidate", (event) => {
          if (event.candidate) {
            client.send(
              "/app/room/sendSDK/" + roomId,
              {},
              JSON.stringify({
                iceCandidate: {
                  uniqueId: peerConnection.uniqueId,
                  data: event.candidate,
                },
              })
            );
          }
        });
        peerConnection.addEventListener("connectionstatechange", (event) => {
          if (peerConnection.connectionState === "connected") {
            // Peers connected!
            console.log("Peers connected!");
          }
        });
        localStream.getTracks().forEach((track) => {
          peerConnection.addTrack(track, localStream);
        });
        peerConnection.addEventListener("track", (event) => {
          const [remoteStream] = event.streams;
          videoRef2.current.srcObject = remoteStream;
        });
        peerConnections.push(peerConnection);
        peerConnection.setRemoteDescription(new RTCSessionDescription(off.off));
        const answer = await peerConnection.createAnswer();
        await peerConnection.setLocalDescription(answer);
        await client.send(
          "/app/room/sendSDK/" + roomId,
          {},
          JSON.stringify({ answer: answer })
        );
      }
      if (can) {
        try {
          var connection = null;
          peerConnections.forEach((peerConnection) => {
            console.log(can);
            console.log(can.uniqueId);
            console.log(peerConnection.uniqueId);
            console.log(can.uniqueId == peerConnection.uniqueId);
            if (can.uniqueId == peerConnection.uniqueId) {
              connection = peerConnection;
              return;
            }
          });
          await connection.addIceCandidate(can.data);
        } catch (e) {
          console.error("Error adding received ice candidate", e);
        }
      }
    });
  };
  var localStream = null;
  const start = async () => {
    try {
      alert(navigator.mediaDevices.getDisplayMedia);
      localStream = await navigator.mediaDevices.getDisplayMedia({
        video: {
          "width": 640,
          "height": 480
        },
        audio: true,
      });
      videoRef.current.srcObject = localStream;
    } catch (e) {
      console.log(e);
    }
  };
  return (
    <div>
      <video id="localVideo" ref={videoRef} autoPlay controls={false} />
      <video id="localVideo2" ref={videoRef2} autoPlay controls={false} />
      <button onClick={makeConn}>Conn</button>
      <button onClick={send}>send</button>
      <button onClick={makeConn2}>Conn</button>
      <button onClick={send2}>send</button>
      <button onClick={sub}>subscribe</button>
      <button onClick={createRoom}>createRoom</button>
      <button onClick={dissolveRoom}>dissolveRoom</button>
      <button onClick={disconnect}>disconnect</button>
      <input
        type="text"
        value={roomId}
        onChange={(e) => (roomId = e.target.value)}
      />
      <input
        type="text"
        value={pass}
        onChange={(e) => (pass = e.target.value)}
      />
      <button onClick={joinInRoom}>joinroom</button>
      <button onClick={send3}>send</button>
      <input type="text" value={url} onChange={(e) => (url = e.target.value)} />
      <input
        type="text"
        value={payload}
        onChange={(e) => (payload = e.target.value)}
      />
      <button onClick={sendCustomly}>sendCustomly</button>
      <button onClick={unSub}>unSubscribe</button>
      <br />
      <button onClick={createP2P}>p2p</button>
      <button onClick={recive}>revieve</button>
      <button onClick={start}>start</button>
    </div>
  );
};

export default TestComponent;
