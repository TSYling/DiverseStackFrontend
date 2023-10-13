import service from "../../util/axoisUtil"
import { search } from "../../store/reducers/musicReducer";
const searchMusic = (keys) => {
  return async (dispatch) => {
    const response = await service.post("/music/search", {
      key: keys.key,
      pn: keys.pn,
      rn: keys.rn,
    });
    const musicData = response.data;
    console.log(keys);
    console.log(response);
    dispatch(search(musicData));
  };
}
const musicInfo = (musicId) => {
  return service.post("/music/info", { musicId: musicId })
}



export default { searchMusic,musicInfo }