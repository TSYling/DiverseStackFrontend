import { useEffect } from "react";
import { NavLink } from "react-router-dom";
import { Divider, Typography } from "antd";
const { Title, Paragraph, Text, Link } = Typography;
function IndexComponent(props) {
  useEffect(() => {
    document.title = props.title;
  });
  return (
    <>
      <Typography
        style={{
          // backgroundColor:"skyblue",
          height: "calc(100vh - 200px)",
          margin: 20,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {/* <Title>介绍</Title>
          <Paragraph>
            本项目于2023年暑期开发:使用React + Redux + Ant Design + Ant ProComponent 实现。
          </Paragraph> */}
          <Title>欢迎！</Title>
        </div>
      </Typography>
    </>
  );
}


export default IndexComponent;
