import {useEffect,useState} from 'react'
import { useLocation } from "react-router-dom"
import ReactAudioPlayer from "react-audio-player";
import musicService from "../../../service/Music"
function MusicDetailComponent(props) {
  const location = useLocation()
  const musicId = location.search.split("=")[1]
  const [data, setData] = useState(null);
  useEffect(() => {
    document.title = " 在线播放";
    musicService.musicInfo(musicId).then((res) => {
      console.log(res.url);
      setData(res.url)
    })
  });

  return data == null ? (
    <>无法播放</>
  ) : (
    <>
      {/* <ReactAudioPlayer src="https://li-sycdn.kuwo.cn/7ccde551024ae4567509f695664b9749/64cd0569/resource/n1/51/15/3900761677.mp3?from$unkown&plat$wapi" /> */}
        <video controls={true} autoPlay="" name="media">
          <source src={data} type="audio/mpeg" />
        </video>
      MusicDetailComponent
    </>
  );
}

export default MusicDetailComponent