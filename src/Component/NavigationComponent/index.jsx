import {
  Button,
  Image,
  Menu,
  Layout,
  theme,
  Divider,
  Avatar,
  FloatButton,
  ConfigProvider,
  Popover,
  Typography,
  Rate,
  Progress,
  Space
} from "antd";
import { useState, useEffect, useRef } from "react";
import "./index.scss";
import {
  CheckCircleTwoTone,
  BulbOutlined,
  UserOutlined,
  PoweroffOutlined,
  MenuUnfoldOutlined,
  MenuFoldOutlined,
  LoadingOutlined,
  CloseCircleTwoTone,
} from "@ant-design/icons";
import { HappyProvider } from "@ant-design/happy-work-theme";
import zhCN from "antd/es/locale/zh_CN";
import App from "../../App";
import config from "../../config/config.json";
import webSocket from "../../hooks/webSocket"

import { useMemo } from "react";
import { useNavigate,NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
const webSocketContext = webSocket.webSocketContext;

function NavigationComponent() {
  const { Header, Footer, Sider } = Layout;
  const { Title, Paragraph, Text } = Typography;
  const navigate = useNavigate();
  const headerComponent = useRef();
  const footerComponent = useRef();
  const siderComponent = useRef();
  const userReducer = useSelector(state => state.userReducer);
  const stompReducer = useSelector(state => state.stompReducer);
  const [client, setClient] = useState(null);
  const hasRun = useRef(false);
  const stomp = webSocket.useWebSocket();

  // websocket/stomp 连接
  useEffect(() => {
      // 这里的代码只会执行一次
      // 登录了才连接
    if (userReducer.isLogin && !hasRun.current) {
      hasRun.current = true;
      stomp.connect().then((client) => {
        setClient(client);
      });
    }
    return () => {
    };
  }, [stomp,userReducer.isLogin]);
  /**
   * 主题变换
   */
  var themeStyle;
  themeStyle = localStorage.getItem("theme");
  if (!themeStyle) {
    localStorage.setItem("theme", "light");
    themeStyle = "light";
  }
  const light = useMemo(() => {
    return {
      ...config["light-theme"],
      algorithm: theme.defaultAlgorithm,
    };
  }, []);
  const dark = useMemo(() => {
    return {
      ...config["dark-theme"],
      algorithm: theme.darkAlgorithm,
    };
  }, []);
  const [themeAlgorithm, setThemeAlgorithm] = useState(
    themeStyle == "light" ? light : dark
  );
  const [headerBackgroundColor, setBackgroundColor] = useState(
    themeStyle == "light"
      ? config.menu["light-background"]
      : config.menu["dark-background"]
  );
  /**
   * 用户登录状态
   */
  const userInfo = userReducer.info;
  useEffect(() => {
    if (window.location.pathname === "/login") {
      headerComponent.current.classList.add("hidden");
      footerComponent.current.classList.add("hidden");
      siderComponent.current.classList.add("hidden");
    } else {
      headerComponent.current.classList.remove("hidden");
      footerComponent.current.classList.remove("hidden");
      siderComponent.current.classList.remove("hidden");
    }
  });
  useEffect(() => {
    if (userReducer.isLogin) {
      setPopoverOpenStatu(null);
    } else {
      setPopoverOpenStatu(false);
    }
    return () => {};
  }, [userReducer.isLogin]);
  const tip = userReducer.isLogin ? "欢迎！" : "未登录";

  /**
   * 用户登录相关
   */
  const userOptionsTitle = (
    <div className="user-info-title">
      <Typography className="main-info">
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItem: "center",
          }}
        >
          <Title
            level={3}
            type="default"
            style={{ textAlign: "center", marginBottom: "18px",marginLeft:25 }}
          >
            {userInfo.name}
          </Title>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              height: 34,
              paddingLeft: 10,
            }}
          >
            {stompReducer.isConnected == true && (
              <CheckCircleTwoTone twoToneColor="#52c41a" />
            )}
            {stompReducer.isConnected == null && <LoadingOutlined />}
            {stompReducer.isConnected == false &&<CloseCircleTwoTone twoToneColor="#ff4d4f" />}
          </div>
        </div>
        <Divider style={{ marginTop: 0 }} />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
          }}
        >
          <Paragraph>
            <Avatar size={80} />
          </Paragraph>
          <div>
            <Paragraph
              style={{
                marginBottom: 0,
                paddingLeft: 15,
              }}
            >
              {userInfo.signature
                ? userInfo.signature
                : "这个人很懒，什么都没留下"}
            </Paragraph>
          </div>
        </div>
      </Typography>
      {/* ---------------------------------------- */}
      <Divider
        style={{
          marginTop: 5,
        }}
      />
      <div className="social-info">
        <Button type="link" className="info-box">
          <Title type="secondary" level={3}>
            100
          </Title>
          <Text>关注</Text>
        </Button>
        <Button type="link" className="info-box">
          <Title type="secondary" level={3}>
            23
          </Title>
          <Text>粉丝</Text>
        </Button>
        <Button type="link" className="info-box">
          <Title type="secondary" level={3}>
            123123
          </Title>
          <Text>朋友</Text>
        </Button>
      </div>
      <Divider
        style={{
          marginBottom: 5,
        }}
      />
      <div className="account-info">
        <div>
          <div style={{ padding: "10px 0 4px 0px" }}>
            <Text>会员等级</Text>
          </div>
          <Rate
            style={{
              fontSize: 17,
              marginInlineEnd: "2px",
            }}
            defaultValue={userInfo.vipLevel + 1}
            disabled
            count={11}
            character={({ index }) => config.indexCaracter[index]}
          />
        </div>
        <div
          style={{
            display: "flex",
            padding: "4px 0",
            paddingTop: "10px",
          }}
        >
          <Space
            style={{
              display: "flex",
              alignItems: "flex-start",
              flexDirection: "column",
              width: "35%",
            }}
          >
            <div>
              <Text>个人等级</Text>
            </div>
            <Progress
              style={{
                marginLeft: "5px",
              }}
              type="circle"
              size={50}
              percent={(userInfo.exp / (100 * userInfo.level)) * 100}
              strokeColor={config.fiveColors}
              showInfo={true}
              format={() => {
                return userInfo.level;
              }}
            />
          </Space>
          <div
            style={{
              display: "flex",
              width: "100%",
              height: "100%",
              flexDirection: "column",
              paddingTop: "15px",
            }}
          >
            <Title
              level={4}
              style={{
                margin: 0,
                width: "100%",
                textAlign: "center",
              }}
            >
              {config.coinName}
            </Title>
            <Title
              level={3}
              type="warning"
              style={{
                margin: 0,
                width: "100%",
                textAlign: "center",
              }}
            >
              {userInfo.coin}
            </Title>
          </div>
        </div>
      </div>
    </div>
  );
  const userOptionsContent = (
    <div className="user-info-content">
      <Button type="link" href="#" className="user-center">
        <div>
          <UserOutlined className="icon" />
          <div>个人中心</div>
        </div>
      </Button>
      <Button type="link" onClick={() => {
        navigate("/logout")
      }} className="logout">
        <div>
          <PoweroffOutlined className="icon" />
          <div>退出登录</div>
        </div>
      </Button>
    </div>
  );
  const logoProvider = (
    <NavLink to="/" className="logo">
      <Image
        src="/icon_wing.svg"
        preview={false}
        className="navigation-logo"
        width={40}
      />
      <Title
        italic
        level={4}
        style={{
          display: "flex",
          marginBottom: 0,
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {"SiteLin " +
          (config.urlTitle[window.location.pathname.split("/")[1]]
            ? config.urlTitle[window.location.pathname.split("/")[1]]
            : "")}
      </Title>
    </NavLink>
  );
  const menuOnclick = (item) => {
    navigate("/" + item.key);
  };
  const changeTheme = () => {
    if (themeStyle == "light") {
      setThemeAlgorithm(dark);
      setBackgroundColor(config.menu["dark-background"]);
      localStorage.setItem("theme", "dark");
    } else {
      setThemeAlgorithm(light);
      setBackgroundColor(config.menu["light-background"]);
      localStorage.setItem("theme", "light");
    }
  };

  const [popoverOpenStatu, setPopoverOpenStatu] = useState(false);

  const userInfoButtonOnclick = () => {
    if (!userReducer.isLogin) {
      window.location.href = "/login";
    }
  };
  // sider配置
  const [collapsed, setCollapsed] = useState(true);
  return (
    <webSocketContext.Provider value={client}>
      <>
        <ConfigProvider locale={zhCN} theme={themeAlgorithm}>
          <div className="navigation">
            <Layout>
              <Sider
                collapsedWidth={0}
                className="sider"
                trigger={null}
                style={{ backgroundColor: headerBackgroundColor }}
                collapsible
                collapsed={collapsed}
                ref={siderComponent}
              >
                <div className="logo-container">{logoProvider}</div>
                <Divider
                  style={{
                    marginTop: 7,
                  }}
                />
                <Menu
                  // theme="dark"
                  mode="inline"
                  items={config.menuOptions}
                  onClick={menuOnclick}
                  style={{
                    height: "60vh",
                  }}
                />
                {/* <div
                className="login-container"
                style={{
                  display: "flex",
                  alignItems: "flex-end",
                  width: "100%",
                  flexGrow: 1,
                  paddingBottom: 10,
                  justifyContent: "center",
                }}
              >
                <HappyProvider>
                  <Popover
                    className="login-button"
                    placement="bottomRight"
                    title={userOptionsTitle}
                    content={userOptionsContent}
                    trigger="click"
                    open={popoverOpenStatu}
                  >
                    <Button
                      onClick={userInfoButtonOnclick}
                      style={{
                        height: 40,
                        width: "80%",
                      }}
                    >
                      <Avatar
                        className="user-icon"
                        size="32"
                        icon={<UserOutlined />}
                      />
                      {tip}
                    </Button>
                  </Popover>
                </HappyProvider>
              </div> */}
              </Sider>
              <Layout style={{ minHeight: "90vh" }}>
                {/* 头部 */}
                <Header
                  className="header"
                  style={{
                    backgroundColor: headerBackgroundColor,
                    paddingRight: 0,
                  }}
                  ref={headerComponent}
                >
                  {/* logo部分 */}
                  <Button
                    className="sider-button"
                    type="text"
                    icon={
                      collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />
                    }
                    onClick={() => setCollapsed(!collapsed)}
                    style={{
                      fontSize: "16px",
                      width: 64,
                      height: 64,
                    }}
                  />
                  {logoProvider}

                  <Divider
                    type="vertical"
                    style={{
                      height: "80%",
                    }}
                  />
                  {/* 导航部分 */}
                  <Menu
                    className="menu"
                    mode="horizontal"
                    items={config.menuOptions}
                    onClick={menuOnclick}
                  />
                  {/* 用户相关按钮部分 */}
                  <div className="login-container">
                    <HappyProvider>
                      <Popover
                        className="login-button"
                        placement="bottomRight"
                        title={userOptionsTitle}
                        content={userOptionsContent}
                        trigger="click"
                        open={popoverOpenStatu}
                      >
                        <Button onClick={userInfoButtonOnclick}>
                          <Avatar
                            className="user-icon"
                            size="32"
                            icon={<UserOutlined />}
                          />
                          {tip}
                        </Button>
                      </Popover>
                    </HappyProvider>
                  </div>
                </Header>
                {/* 内容 */}
                <App />
                {/* 悬浮按钮 */}
                <FloatButton
                  className="change-theme-button"
                  icon={<BulbOutlined />}
                  onClick={changeTheme}
                />
                {/* 底部 */}
                <Footer
                  style={{
                    textAlign: "center",
                  }}
                  ref={footerComponent}
                >
                  -------- ©2023 Created by Lin
                </Footer>
              </Layout>
            </Layout>
          </div>
        </ConfigProvider>
      </>
    </webSocketContext.Provider>
  );
}
export default NavigationComponent;

