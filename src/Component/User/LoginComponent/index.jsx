import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import config from "../../../config/config.json";
import userService from "../../../service/User";
import vertifyService from "../../../service/VertifyCode/index";
import "./index.scss";
import { LockOutlined, SendOutlined, UserOutlined } from "@ant-design/icons";
import {
  LoginFormPage,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from "@ant-design/pro-components";
import { Alert, Divider, message, Typography, Tabs, Image, Card } from "antd";

import { useDispatch, useSelector } from "react-redux";
const { Text, Title } = Typography;

function LoginComponent(props) {
  const navigate = useNavigate();
  const [messageApi, contextHolder] = message.useMessage();
  const [formStatus, setformStatus] = useState(false);
  const dispatch = useDispatch();
  const userReducer = useSelector((state) => state.userReducer);
  useEffect(() => {
    if (userReducer.isLogin == true) navigate("/", { replace: true });
    document.title = props.title;
  });

  const loginOnFinish = async (data) => {
    setformStatus(true);
    dispatch(userService.loginService(data)).catch((e) => {
      let info = e.response.data.information;
      messageApi.open({
        type: "error",
        content: info,
      });
    });
    setformStatus(false);
  };
  const [loginType, setLoginType] = useState("account");
  return (
    <div
      style={{
        // backgroundColor: "white",
        // height: "calc(100vh - 48px)",
        height: "100vh",
      }}
    >
      {config.phoneActive ? (
        <></>
      ) : (
        <Alert
          showIcon
          message="注意: 手机验证码登录、注册暂不可用!"
          type="warning"
          closable
        />
      )}
      {contextHolder}
      <LoginFormPage
        disabled={formStatus}
        backgroundImageUrl="./login_bg3.jpg"
        // backgroundVideoUrl="./bg-video.mp4"
        logo={config.logoUrl}
        title={
          <Title
            onClick={() => {
              window.location.href = "/";
            }}
            style={{ margin: 0, cursor: "pointer" }}
          >
            {config.webSiteTitle}
          </Title>
        }
        subTitle={config.webSiteSubTitle}
        onFinish={loginOnFinish}
        activityConfig={{
          style: {
            display: "flex",
            margin: 0,
            padding: 0,
            width: "100%",
            height: "62.5%",
          },
          action: (
            <div className="video-container">
              <video
                src="./bg-video.mp4"
                className="bg-video"
                autoPlay
                muted
                loop
              />
              <Card className="text-container">
                <Title className="title">
                  {config["login-page-info"].title}
                </Title>
                <Title className="title">
                  {"日期: " + config["login-page-info"].date}
                </Title>
                <Title className="title">
                  {"信息: " + config["login-page-info"].content}
                </Title>
              </Card>
            </div>
          ),
        }}
        actions={
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            <a
              style={{
                marginLeft: "auto",
                marginBottom: 10,
                marginTop: 3,
              }}
              href="/register"
            >
              没有账号? 立即注册
            </a>
            <Divider plain style={{ marginTop: 0 }}>
              <span
                style={{ color: "#CCC", fontWeight: "normal", fontSize: 14 }}
              >
                其他登录方式
              </span>
            </Divider>
            <Text>暂无</Text>
            <Image
              src="./login-bg2.jpeg"
              preview={false}
              style={{
                marginTop: "70px",
                transform: "scale(1.2)",
                paddingBottom: "40px",
              }}
            ></Image>
          </div>
        }
      >
        <Tabs
          centered
          activeKey={loginType}
          onChange={(activeKey) => setLoginType(activeKey)}
          items={config.loginTabItems}
        ></Tabs>
        {loginType === "account" && (
          <>
            <ProFormText
              name="username"
              fieldProps={{
                size: "large",
                prefix: <UserOutlined className={"prefixIcon"} />,
              }}
              placeholder={"手机/邮箱/ID (id以i+id号)"}
              rules={[
                {
                  validator: async (_, value) => {
                    const phone = /^1\d{10}$/;
                    const email = /^\S+@\S+\.\S+$/;
                    const id = /^i[1-9]\d*$/;
                    if (!value)
                      return Promise.reject(new Error("请输入手机/邮箱/ID"));
                    if (
                      !phone.test(value) &&
                      !email.test(value) &&
                      !id.test(value)
                    )
                      return Promise.reject(new Error("格式错误"));
                    if (phone.test(value) && !config.phoneActive)
                      return Promise.reject(new Error("手机暂不可用"));
                  },
                },
              ]}
            />
            <ProFormText.Password
              name="password"
              fieldProps={{
                size: "large",
                prefix: <LockOutlined className={"prefixIcon"} />,
              }}
              placeholder={"密码"}
              rules={[
                {
                  required: true,
                  message: "请输入密码！",
                },
              ]}
            />
          </>
        )}
        {loginType === "captcha" && (
          <>
            <ProFormText
              fieldProps={{
                size: "large",
                prefix: <SendOutlined className={"prefixIcon"} />,
              }}
              name="username"
              placeholder={"手机/邮箱"}
              rules={[
                {
                  validator: async (_, value) => {
                    const phone = /^1\d{10}$/;
                    const email = /^\S+@\S+\.\S+$/;
                    if (!value)
                      return Promise.reject(new Error("请输入手机/邮箱"));
                    if (!phone.test(value) && !email.test(value))
                      return Promise.reject(new Error("格式错误"));
                    if (phone.test(value) && !config.phoneActive)
                      return Promise.reject(new Error("手机暂不可用"));
                  },
                },
              ]}
            />
            <ProFormCaptcha
              fieldProps={{
                size: "large",
                prefix: <LockOutlined className={"prefixIcon"} />,
              }}
              captchaProps={{
                size: "large",
              }}
              placeholder={"请输入验证码"}
              phoneName="username"
              countDown={60}
              captchaTextRender={(timing, count) => {
                if (timing) {
                  return `${count} ${"获取验证码"}`;
                }
                return "获取验证码";
              }}
              name="captcha"
              rules={[
                {
                  required: true,
                  message: "请输入验证码！",
                },
              ]}
              onGetCaptcha={async (username) => {
                let flag = await vertifyService.getLoginVertifyCode({
                  username,
                });
                if (flag) message.success(flag);
                else {
                  message.error("验证码发送失败!");
                  throw new Error("验证码发送失败!");
                }
              }}
            />
          </>
        )}
        <div
          style={{
            marginBlockEnd: 24,
          }}
        >
          <ProFormCheckbox noStyle name="remember-me">
            自动登录
          </ProFormCheckbox>
          <a
            style={{
              float: "right",
            }}
            href="/resetPassword"
          >
            忘记密码
          </a>
        </div>
      </LoginFormPage>
    </div>
  );
}
export default LoginComponent;
