import service from "../../util/axoisUtil"
import store from "../../store"
async function searchMusic(keys) {
  await service.post("/music/search", {key:keys.key,pn:keys.pn,rn:keys.rn})
    .then((response) => {
      // console.log(response.data);
      store.dispatch({type:"SEARCH",payload:response.data})
    }).catch((error) => {
    console.log(error);
  })
}
async function musicInfo(musicId) {
  var data = null;
  await service
    .post("/music/info", { musicId: musicId })
    .then((response) => {
      console.log(response.data);
      data = response.data.data
    })
    .catch((error) => {
      console.log(error);
    });
  return data;
}



export default { searchMusic,musicInfo }