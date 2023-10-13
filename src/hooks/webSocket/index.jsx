import { useContext, createContext } from "react";
import stomp from "stompjs";
import sockJs from "sockjs-client/dist/sockjs.min.js";
import configJson from "../../config/config.json";
import { useDispatch, useSelector } from "react-redux";
import { init, disConnect,setRoomsInfo,clearRoomsInfo } from "../../store/reducers/stompReducer";
/**
 * tipppppppppppppppppppppppppppppppppppppp
 * Service中的许多模块其实可以作为hook进行开发。。
 */
const ws = new sockJs(configJson.baseURL + "/api/webSocket");
const client = stomp.over(ws);
const webSocketContext = createContext(null);

const useWebSocket = () => {
  const dispatch = useDispatch();
  const stompReducer = useSelector((state) => state.stompReducer);

  // 处理获取到的数据
  const organizeFrame = (frame) => {
    console.log("frame", frame);
    var body = frame.body;
    body = JSON.parse(body);
    if (!(body.code == 200))
      throw new Error(body.error);
    switch (body.type) {
      case "roomsInfo":
        dispatch(setRoomsInfo(body.contextMap));
        break;
      default:
        break;
    }
  }
  const connect = () => {
    return new Promise((resolve, reject) => {
      // 防止重复连接
      if (!stompReducer.isConnected)
        client.connect(
          {},
          function () {
            // 连接成功
            dispatch(init())
            // 初始化连接
            client.subscribe("/user/topic/status", function (frame) {
              organizeFrame(frame);
            });
            resolve(client);
          },
          (error) => {
            // console.log("error");
            // console.log(error);
            // 中途断线之类的
            dispatch(disConnect());
            reject(error);
          }
        );
    });
  };
  const disconnect = () => { 
    client.disconnect();
    dispatch(disConnect());
  }
  return { connect,disconnect };
};
const useWebSocketService = () => { 
  const dispatch = useDispatch();
  /**
   * 获取连接客户端
   */
  const getClient = () => {
    return client;
  };
  /**
   * 获取当前所有房间数据
   */
  const getRooms = () => { 
    return client.send("/app/room/roomsInfo", {}, {});
  }
  /**
   * 清除已获取到的房间数据
   */
  const clearRooms = () => { 
    dispatch(clearRoomsInfo());
  }
  /**
   * 创建房间
   */
  const createRoom = (password) => { 
    return client.send("/app/room/createRoom/", {}, { password });
  }
  return { getClient,getRooms,createRoom,useWebSocketService,clearRooms };
}


export default { useWebSocket, webSocketContext,useWebSocketService };
