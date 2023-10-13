import "./index.scss";
import {useState} from "react"
import VideoWindow from "../VideoWindow";
import ChatWindow from "../ChatWindow";
function Detail() {
  const [cClassName, setCClassName] = useState("c-window");
  const changeFixed = () => {
    if (cClassName === "c-window") {
      setCClassName("c-window-fixed");
    } else {
      setCClassName("c-window");
    }
  };
  const start = {
    voice: () => {
      console.log("voice");
    },
    video: () => {
      console.log("video");
    },
    screen: () => {
      console.log("screen");
    },
  };
  return (
    <div className="chat-container">
      <VideoWindow
        className="v-window"
        sources={[
          { id: "a", key: 1 },
          { id: "b", key: 2 },
          { id: "v", key: 3 },
          { id: "d", key: 4 },
          { id: "e", key: 5 },
        ]}
      />
      <ChatWindow
        start={start}
        className={cClassName}
        changeFixed={changeFixed}
      />
    </div>
  );
}

export default Detail;
