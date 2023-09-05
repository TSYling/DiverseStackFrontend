import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import userService from "../../../service/User"
import { connect } from "react-redux";
import "./index.css";
// import {
//   MailOutlined,
// } from "@ant-design/icons";
import { Button, Form, Input } from "antd";
function LoginComponent(props) {
  const navigate = useNavigate()
  useEffect(() => {
    if (props.isLogin == true) navigate("/", { replace: true });
  
    document.title = props.title;
  });
  var container = null;

  const signUpClick = () => {
    container.classList.add("sign-up-mode");
  };
  const signInClick = () => {
    container.classList.remove("sign-up-mode");
  };
  const loginOnFinish = (data) => {
    userService.login(data)
  };
  return (
    <>
      <div className="container" ref={(er) => (container = er)}>
        <div className="form-warp">
          <Form
            name="base"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            className="sign-in-form"
            onFinish={loginOnFinish}
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item>
              <h1 className="form-title">登 录</h1>
            </Form.Item>
            <Form.Item
              // label="用户名"
              name="username"
              rules={[
                { required: true, message: "账号不能为空!" },
                {
                  pattern: /^[\w.-]+@\w+\.\w+(\.\w+)?$/,
                  message: "邮箱格式错误",
                },
              ]}
            >
              <Input placeholder="Email" className="Input" />
            </Form.Item>

            <Form.Item
              // label="密码"
              name="password"
              rules={[
                { required: true, message: "密码不能为空!" },
                { max: 20, message: "密码长度不能超过20个字符!" },
                { min: 6, message: "密码长度不能少于6位、多于20位" },
              ]}
            >
              <Input.Password
                placeholder="password"
                className="Input"
                maxLength={20}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" className="submit-btn">
                立即登录
              </Button>
            </Form.Item>
          </Form>
          <Form
            name="registerForm"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            style={{ maxWidth: 600 }}
            initialValues={{ remember: true }}
            className="sign-up-form"
            // onFinishFailed={onFinishFailed}
            autoComplete="off"
          >
            <Form.Item>
              <h1 className="form-title">注 册</h1>
            </Form.Item>
            <Form.Item
              name="username"
              rules={[
                { required: true, message: "邮箱不能为空!" },
                {
                  pattern: /^[\w.-]+@\w+\.\w+(\.\w+)?$/,
                  message: "邮箱格式错误",
                },
              ]}
            >
              <Input placeholder="Email" className="Input" />
            </Form.Item>

            <Form.Item
              name="password"
              rules={[
                { required: true, message: "密码不能为空!" },
                { max: 20, message: "密码长度不能超过20个字符!" },
                { min: 6, message: "密码长度不能少于6位、多于20位" },
              ]}
            >
              <Input.Password
                placeholder="password"
                className="Input"
                maxLength={20}
              />
            </Form.Item>
            <Form.Item
              name="reTypePassword"
              rules={[
                { required: true, message: "密码不能为空!" },
                { max: 20, message: "密码长度不能超过20个字符!" },
                { min: 6, message: "密码长度不能少于6位、多于20位" },

                ({ getFieldValue }) => ({
                  validator(_, value) {
                    if (!value || getFieldValue("password") === value) {
                      return Promise.resolve();
                    }
                    return Promise.reject(
                      new Error("两次密码输入不一致，请重新输入")
                    );
                  },
                }),
              ]}
            >
              <Input.Password
                placeholder="password"
                className="Input"
                maxLength={20}
              />
            </Form.Item>

            <Form.Item>
              <Button type="primary" className="submit-btn">
                立即注册
              </Button>
            </Form.Item>
          </Form>
        </div>
        <div className="desc-warp">
          <div className="desc-warp-item sign-up-desc">
            <div className="content">
              <Button
                onClick={signUpClick}
                className="transfer-btn"
                type="default"
              >
                注册
              </Button>
            </div>
            {/* <img src="./img/log.svg" alt=""/> */}
          </div>
          <div className="desc-warp-item sign-in-desc">
            <div className="content">
              <Button
                onClick={signInClick}
                className="transfer-btn"
                type="default"
              >
                登录
              </Button>
            </div>
            {/* <img src="./img/register.svg" alt=""/> */}
          </div>
        </div>
      </div>
    </>
  );
}
function mapStateToProps(state) {
  return {
    isLogin : state.userReducer.isLogin
  };
}
function mapDispatchToProps(dispatch) {
  return {
    // signUp: () => dispatch(signUp(data)),
  }
}
const LoginComponent2 = connect(
  mapStateToProps,
  mapDispatchToProps
)(LoginComponent);

export default LoginComponent2;
