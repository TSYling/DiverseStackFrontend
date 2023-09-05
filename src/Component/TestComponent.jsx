import { useEffect, useRef } from 'react';
import stomp from 'stompjs';
import sockJs from 'sockjs-client/dist/sockjs.min.js';
// webRtc https://webrtc.org/getting-started/media-devices?hl=zh-cn

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
        cursor: 'never',
        displaySurface: 'window'
        },
        audio: false
      };
      const stream = await navigator.mediaDevices.getUserMedia(constraints);
      const videoElement = videoRef.current;
      videoElement.srcObject = stream;
      const stream2 = await navigator.mediaDevices.getDisplayMedia({
        video: true,
        audio: true
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
    webSocket.send(JSON.stringify({ message: "Hello!"}));
  }
  var client = null;
  const makeConn2 = () => {
    const ws = new sockJs("http://localhost:5173/api/webSocket");
    client = stomp.over(ws)
    client.connect({}, function (frame) {
      console.log(frame);
    }, (error) => {
      console.log("error");
      console.log(error);
    });
    
    // client.subscribe("/topic/greetings", function (greeting) {
    //   console.log(greeting.body);
    // });
  };
  const send2 = () => {
    client.send(
      "/app/createRoom",
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
  }
  const createRoom = () => {
    client.subscribe("/user/topic/status", function (x) {
      console.log(x);
    });
    client.send("/app/createRoom/123", {},"123123");
  }
  const disconnect = () => {
    client.disconnect(() => {
      console.log("已断开连接");
    });
  }
  var roomId;
  var pass;
  const joinInRoom = () => {
    client.subscribe("/room/" + roomId, (x) => {
      console.log("订阅已发送 "+roomId);
    },{password:pass})
  }
  
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
      <button onClick={disconnect}>disconnect</button>
      <input type="text" value={roomId} onChange={(e) => (roomId = e.target.value)} />
      <input type="text" value={pass} onChange={(e) => (pass = e.target.value)} />
      <button onClick={joinInRoom}>joinroom</button>
      
      
    </div>
  );
}

export default TestComponent;
