import { Card, Col, Row } from "antd";
import { useEffect, useState } from "react";
import {
  ExpandOutlined,
  CompressOutlined,
  EditOutlined,
  EllipsisOutlined,
} from "@ant-design/icons";
function VideoWindow(props) {
  const [selected, setSelected] = useState(-1);
  // 用来操作布局的相关数据 // 暂不采用此种布局
  // const [spanValue,setSpanValue] = useState([6,24,18]);
  const sources = props.sources;
  const column = Math.floor(Math.sqrt(sources.length));

  const gridStyle = {
    // width: "50%",
    textAlign: "center",
    padding: 0,
  };
  useEffect(() => {
    document.title = "消息界面";
    return () => {};
  });
  // 让点击的界面变得更大
  const biggerClick = (key) => {
    if(key == selected)
      setSelected(-key);
    else
      setSelected(key);
  };
  const videoCard = (id, key, flag) => (
    <Card
      title={
        <div
          style={{
            textAlign: "left",
            padding: 8,
          }}
        >
          {id}
        </div>
      }
      type="inner"
      hoverable={false}
      style={gridStyle}
      bodyStyle={{ padding: 0 }}
      headStyle={{ display: "contents" }}
      actions={
        flag
          ? [
              <ExpandOutlined
                onClick={() => {
                  biggerClick(key);
                }}
                key="setting"
              />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]
          : [
              <CompressOutlined
                onClick={() => {
                  biggerClick(key);
                }}
                key="setting"
              />,
              <EditOutlined key="edit" />,
              <EllipsisOutlined key="ellipsis" />,
            ]
      }
      cover={
        <video
          style={{ width: "100%" }}
          src="../bg-video.mp4"
          autoPlay
          muted
          loop
          controls
        ></video>
      }
    ></Card>
  );
  return (
    <div className={props.className}>
      <Card title="视频列表">
        <Row gutter={16}>
          <Col span={selected > 0 ? 24 : 0}>
            {selected > 0
              ? videoCard(sources[selected-1].id, sources[selected-1].key, false)
              : null}
          </Col>
          <Col span={24}>
            <Row gutter={16}>
              {sources.map((item) =>
                // 选中的就不能在这里显示
                selected == item.key ? (
                  <Col span={0} key={item.key}>
                    {videoCard(item.id, item.key, true)}
                  </Col>
                ) : (
                  <Col span={24 / column} key={item.key}>
                    {videoCard(item.id, item.key, true)}
                  </Col>
                )
              )}
            </Row>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default VideoWindow;
