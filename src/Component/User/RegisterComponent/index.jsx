import "./index.scss";
import config from "../../../config/config.json";
import userService from "../../../service/User/index";
import vertifyService from "../../../service/VertifyCode";

import {
  LockOutlined,
  KeyOutlined,
  UserOutlined,
  SmileOutlined,
  MailOutlined,
} from "@ant-design/icons";
import {
  LoginForm,
  ProConfigProvider,
  ProFormCaptcha,
  ProFormText,
} from "@ant-design/pro-components";
import { message, Alert, Tabs, Typography, Result, Button } from "antd";
import { useState, useEffect, useRef } from "react";
const { Text, Title } = Typography;
function RegisterComponet() {
  const theme = localStorage.getItem("theme");
  const [messageApi, contextHolder] = message.useMessage();
  const registerContainer = useRef();
  const resultContainer = useRef();
  useEffect(() => {
    if (theme == "dark") setbgImage(`url("./register-bg3.jpg")`);
    else {
      setbgImage(`url("./register-bg.jpg")`);
    }
    document.title = "注册";
    return () => {};
  }, [theme]);
  const [loginType, setLoginType] = useState("captcha");
  const [formStatus, setFormStatus] = useState(false);
  const [result, setResult] = useState({
    name: "",
    id: "",
  });
  const [bgImage, setbgImage] = useState(`url("./register-bg.jpg")`);
  const registerOnFinish = async (data) => {
    setFormStatus(true);
    await userService
      .register(data)
      .then((response) => {
        setResult({
          name: data.name,
          id: response.data.data,
        });
        registerContainer.current.style.display = "none";
        resultContainer.current.style.display = "flex";
      })
      .catch((error) => {
        messageApi.open({
          type: "error",
          content: "注册失败 " + error.response.data.msg,
          style: {
            marginTop: "8vh",
          },
        });
      });
    setFormStatus(false);
  };
  const customProFormText = () => {
    return (
      <>
        <ProFormText
          fieldProps={{
            size: "large",
            prefix: <UserOutlined className={"prefixIcon"} />,
          }}
          name="name"
          placeholder={"昵称"}
          rules={[
            {
              validator: async (_, value) => {
                if (!value) return Promise.reject(new Error("昵称不能为空"));
                let lenth = value.replace(/[\u4e00-\u9fa5]/g, "  ").length;
                if (lenth > 32)
                  return Promise.reject(
                    new Error("汉字不能超过16个字符,字母不能超过32个字符")
                  );
              },
            },
          ]}
        />
        <ProFormText.Password
          fieldProps={{
            size: "large",
            prefix: <KeyOutlined className={"prefixIcon"} />,
          }}
          name="password"
          tooltip={<Text>密码长度不小于6位且不大于20位</Text>}
          placeholder={"密码"}
          colSize={20}
          rules={[
            {
              validator: async (_, value) => {
                if (!value) return Promise.reject(new Error("密码不能为空"));
                if (value.length < 6 || value.length > 20)
                  return Promise.reject("密码长度不小于6位且不大于20位");
              },
            },
          ]}
        />
      </>
    );
  };
  return (
    <div
      className="register-container"
      style={{
        backgroundImage: bgImage,
      }}
    >
      <div
        ref={resultContainer}
        style={{
          display: "none",
          flexGrow: 1,
        }}
      >
        <Result
          className="resultContainer"
          status="success"
          title={<Title>{result.name + config.register.success.title}</Title>}
          subTitle={
            <Title level={5}>
              {config.register.success.subTitle +
                " " +
                result.id +
                " " +
                config.register.success.subTitle2}
            </Title>
          }
          extra={
            <Button
              type="primary"
              size="large"
              style={{
                width: "150px",
              }}
              onClick={() => {
                window.location.href = "/";
              }}
            >
              确定
            </Button>
          }
        />
      </div>

      <div
        ref={registerContainer}
        style={{
          display: "flex",
          flexDirection: "column",
          flexGrow: 1,
        }}
      >
        {contextHolder}
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
        <ProConfigProvider hashed={false}>
          <div className="form-container">
            <LoginForm
              disabled={formStatus}
              onFinish={registerOnFinish}
              submitter={{
                searchConfig: {
                  submitText: "注册",
                },
              }}
              logo={config.logoUrl}
              title={
                <Title
                  style={{ margin: 0,cursor:"pointer" }}
                  onClick={() => {
                    window.location.href = "/";
                  }}
                >
                  {config.webSiteTitle}
                </Title>
              }
              subTitle={config.webSiteSubTitle}
            >
              <Tabs
                centered
                activeKey={loginType}
                onChange={(activeKey) => setLoginType(activeKey)}
                items={config.RegisterTabItems}
              />
              {loginType === "captcha" && (
                <>
                  {customProFormText()}
                  <ProFormText
                    fieldProps={{
                      size: "large",
                      prefix: <MailOutlined className={"prefixIcon"} />,
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
                    phoneName="username"
                    placeholder={"请输入验证码"}
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
                      let flag = await vertifyService.getRegisterVertifyCode({
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
              {loginType === "special" && (
                <>
                  {customProFormText()}
                  <ProFormText
                    fieldProps={{
                      size: "large",
                      prefix: <SmileOutlined className={"prefixIcon"} />,
                    }}
                    name="invitation"
                    placeholder={"邀请码"}
                    rules={[
                      {
                        required: true,
                        message: "邀请码不能为空",
                      },
                    ]}
                  />
                </>
              )}
              <div
                style={{
                  marginBlockEnd: 24,
                }}
              ></div>
            </LoginForm>
          </div>
        </ProConfigProvider>
      </div>
    </div>
  );
}

export default RegisterComponet;
