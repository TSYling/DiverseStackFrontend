import "./index.scss";

import videojs from "video.js";
import { useEffect, useRef, useState } from "react";
import zhJson from "video.js/dist/lang/zh-CN.json";
videojs.addLanguage("zh-CN", zhJson);
const Player = (props) => {
  const player = useRef();
  const p = useRef();
  useEffect(() => {
    player.current = videojs("vid1", {
      liveui:true,
      loop: true,
      controls: true,
      autoplay: true,
      // muted: true,
      fluid: true,
      preload: "auto",
      language: "zh-CN",
    });
    
    player.current.addClass("vjs-matrix");
    player.current.ready(function () {
      // tech() will log warning without any argument
      var tech = player.current.tech(false);
    });
    // 设置封面
    player.current.poster("./register-bg3.jpg")
    player.current.src({
      src: props.src,
      type:"video/mp4"
    });
    // player.on("ended", function () {
    //   // 自销毁
    //   this.dispose();
    // });
  },[player,props.src]);
  return (
    <div>
      <div className="video-container" style={props.style} ref={p}>
        <video-js
          style={{
            width: "100%",
            height: "100%",
          }}
          id="vid1"
        >
        </video-js>
      </div>
    </div>
  );
};

export default Player;
