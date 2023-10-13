import {
  Button,
  Card,
  Divider,
  Input,
  Popover,
  message,
  Typography,
} from "antd";
import { useState, useEffect, useRef } from "react";
import { PushpinOutlined } from "@ant-design/icons";
import "./index.scss"
const { TextArea } = Input;
const { Text } = Typography;
function ChatWindow(props) {
  const [messageApi, contextHolder] = message.useMessage();
  const [messages, setMessage] = useState([]);
  const [scroll, setScroll] = useState(0);
  const [text, setText] = useState(undefined);
  const textAreaRef = useRef();
  const messagesRef = useRef();
  var messageRefs = [];
  useEffect(() => {
    setMessage([
      { id: 1, message: "Hello", role: "other" },
      { id: 1, message: "Hello", role: "self" },
      { id: 1, message: "Hello", role: "other" },
      { id: 1, message: "Hello", role: "other" },
    ]);
  }, []);
  useEffect(() => {
    /**
     * 实现了当滚动条在底部时候保持新消息来时也在底部
     * 当不在底部的时候不动滚动条
     *  */
    if (messagesRef.current.scrollTop >= scroll)
      setTimeout(() => {
        messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
      }, 0);
    setScroll(
      messagesRef.current.scrollHeight - messagesRef.current.clientHeight
    );
  }, [messages, scroll]);
  const sendMessage = () => {
    if (!text || text.trim().length === 0) {
      setText(undefined)
      // 显示错误
      messageApi.warning("不能发送空字符串")
      return;
    }
      
    setMessage([...messages, { id: 1, message: text, role: "self" }]);
    setText(undefined);
  };
  const onPressEnter = (e) => {
    if (e.shiftKey)
      sendMessage()
  }
  return (
    <div className={props.className}>
      {contextHolder}
      <Card
        title="Chat Window"
        extra={
          <PushpinOutlined
            onClick={() => {
              props.changeFixed();
            }}
          />
        }
        bordered={false}
        // bodyStyle={{ paddingTop:0}}
      >
        <Card
          style={{
            border: 0,
            height: "62vh",
            overflow: "auto",
          }}
          bodyStyle={{
            padding: 0,
            display: "flex",
            height: "100%",
            flexDirection: "column",
            alignItems: "flex-start",
          }}
          ref={messagesRef}
        >
          {messages.map((item, index) => {
            return (
              <div
                key={index}
                style={
                  item.role === "other"
                    ? {
                        display: "flex",
                        marginBottom: 10,
                      }
                    : {
                        display: "flex",
                        marginBottom: 10,
                        marginLeft: "auto",
                        flexDirection: "row-reverse",
                      }
                }
                ref={(element) => {
                  // 为了获取到每个的父组件
                  messageRefs.push(element);
                }}
              >
                <Popover
                  overlayStyle={{
                    position: "relative",
                    maxWidth: "80%",
                  }}
                  overlayInnerStyle={{
                    width: "100%",
                  }}
                  autoAdjustOverflow={false}
                  placement={item.role === "other" ? "rightTop" : "leftTop"}
                  getPopupContainer={() => messageRefs[index]}
                  content={<div>{item.message}</div>}
                  defaultOpen={true}
                  open={true}
                  color={item.role === "other" ? null : "#17cbe3"}
                >
                  <Button type="context">{item.id}</Button>
                </Popover>
              </div>
            );
          })}
        </Card>
        <div className="custom-actions">
          <Button onClick={props.start.voice} style={{ border: 0 }}>
            语音通话
          </Button>
          <Divider type="vertical" />
          <Button onClick={props.start.video} style={{ border: 0 }}>
            视频通话
          </Button>
          <Divider type="vertical" />
          <Button onClick={props.start.screen} style={{ border: 0 }}>
            投屏
          </Button>
        </div>
        <Divider style={{ marginTop: 0 }} />
        <TextArea
          rows={4}
          // allowClear={true} // 展示有点显示错误
          showCount
          ref={textAreaRef}
          value={text}
          onChange={(e) => {
            setText(e.target.value);
          }}
          onPressEnter={(e) => {
            onPressEnter(e);
          }}
        />
        <Button
          style={{
            width: "30%",
            height: "40px",
            float: "right",
            marginTop: "20px",
          }}
          type="primary"
          onClick={sendMessage}
        >
          发送
        </Button>
        <Text type="secondary">可以使用Shift键+回车键快速发送</Text>
      </Card>
    </div>
  );
}

export default ChatWindow;
