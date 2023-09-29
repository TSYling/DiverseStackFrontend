import "./index.scss"
import Player from "../player/index.jsx"
import videojs from "video.js"
import "video.js/dist/video-js.css"
import { useEffect} from "react"
const LiveComponent = () => {

  return (
    <div>
      <div className="video">Live Component</div>
      <Player style={{
        width: "80%",
        height: "800px",
      }} src="https://ckplayer-video.oss-cn-shanghai.aliyuncs.com/mp4/1_1920x1080.mp4" />
    </div>
  ); 
}

export default LiveComponent;
