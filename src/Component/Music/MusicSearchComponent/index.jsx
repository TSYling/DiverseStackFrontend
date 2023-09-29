import "./index.scss";
import { useCallback, useEffect, useState } from "react";
import { useLocation, useNavigate,Link } from "react-router-dom";
import { Input, Pagination, List, Avatar } from "antd";
import { connect } from "react-redux";
import musicService from "../../../service/Music";
const { Search } = Input;

function MusicSearchComponent(props) {
  const navigate = useNavigate();
  const location = useLocation();
  const [inputKeyword, setInputKeyword] = useState("");
  const [loadState, setLoadState] = useState(false);
  const [total, setTotal] = useState(0);
  const [list, setList] = useState([]);
  const searchString = location.search;
  useEffect(() => {
    if (Object.keys(props.data) != 0 && props.data!=null) {
      console.log(props);
      // http://img1.kwcdn.kuwo.cn/star/albumcover/
      setTotal(props.data.data.total);
      setList(props.data.data.data);
    }
    // setTotal(props.data.list.total);
  },[props.data]);
  useEffect(() => {
    document.title = "音乐搜索";
  },[]);
  useEffect(() => {
    (async () => {
      // 判断路由值并且获取
      if (searchString.indexOf("keyword") > -1) {
        const keyword = {
          key: searchString.split("=")[1].split("&")[0],
          pn:
            searchString.split("=")[2].split("&")[0] == null
              ? 0
              : searchString.split("=")[2]-1,
          rn: 10,
        };
        // 设置当前为搜索状态
        setLoadState(true);
        // 开始查询
        await musicService.searchMusic(keyword)
        // 关闭搜索状态
        setLoadState(false);
      }
    })();
  }, [searchString]);

  const onSearch = (data) => {
    if (data.trim() == "") {
      navigate("/music");
      return;
    }
    setInputKeyword("");
    navigate(location.pathname + "?keyword=" + data + "&pn=1");
  }
  const inputOnChange = (event) => {
    setInputKeyword(event.target.value);
  };

  const onChange = (data) => {
    let keyword = searchString.split("=")[1].split("&")[0];
    navigate(location.pathname + "?keyword=" + keyword + "&pn=" + data);
  }

  return (
    <div className="musicSearchContainer">
      <Search
        onSearch={onSearch}
        onChange={inputOnChange}
        value={inputKeyword}
        className="musicSearchInput"
        placeholder="歌曲信息"
        enterButton="搜索"
        size="large"
        loading={loadState}
      />
      <List
        className="musicSearchList"
        itemLayout="horizontal"
        dataSource={list}
        renderItem={(item, index) => (
          <List.Item>
            <List.Item.Meta
              avatar={
                <Avatar
                  src={
                    "http://img1.kwcdn.kuwo.cn/star/albumcover/" +
                    item.web_albumpic_short
                  }
                  shape="square"
                  size={64}
                />
              }
              title={
                <Link to={"/music/detail?musicId=" + item.DC_TARGETID}>
                  {item.NAME}
                </Link>
              }
              description={
                "作者：" +
                item.ARTIST +
                "专辑：" +
                item.ALBUM +
                (item.mvpayinfo.vid == "0" ? "" : "  暂无法播放 ") +
                (item.payInfo.play == "1111" ? "         VIP":"")
              }
            />
          </List.Item>
        )}
      />
      <Pagination
        showQuickJumper
        defaultCurrent={1}
        total={total}
        onChange={onChange}
      />
      {/* <button onClick={setTotal(100)}>+10</button> */}
    </div>
  );
}

const MusicSearchComponent2 = connect((state) => { return { data:state.musicReducer } }, (dispatch) => { return {} })(MusicSearchComponent);

export default MusicSearchComponent2;


