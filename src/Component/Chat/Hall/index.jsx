import "./index.scss";
import { useRef } from "react";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  Divider,
  Typography,
  Card,
  Empty,
  Button,
  Row,
  Col,
  Modal,
  Form,
  Input,
  InputNumber
} from "antd";
import { UnlockOutlined, LockOutlined } from "@ant-design/icons";
import webSocket from "../../../hooks/webSocket";
import { useCallback } from "react";

const { Title,Text } = Typography;
function Hall() {
  const stompService = webSocket.useWebSocketService();
  const hasRun = useRef(false);
  const hasGet = useRef(false);
  const stompReducer = useSelector((state) => state.stompReducer);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formDisabled, setFormDisabled] = useState(false);
  const roomsInfo = stompReducer.roomsInfo;

  useEffect(() => {
    if (!hasRun.current) {
      hasRun.current = true;
      document.title = "大厅";
    }
  });
  // 刷新获取房间信息
  const refreshRoomsInfo = useCallback(() => {
    stompService.clearRooms();
    stompService.getRooms();
  }, [stompService]);
  useEffect(() => {
    if (stompReducer.isConnected && !hasGet.current) {
      // 保证连接后再获取房间数据
      refreshRoomsInfo();
      hasGet.current = true;
    }
  }, [stompReducer.isConnected, refreshRoomsInfo]);
  useEffect(() => {
    if (roomsInfo == null) {
      // 加载中
      setLoading(true);
    } else {
      setLoading(false);
    }
  }, [roomsInfo]);

  //函数定义部分
  const cardOnclick = (roomId) => {
    //TODO 进入房间
    console.log(roomId);
  };
  const openModal = () => {
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setFormDisabled(true);
    
  };
  return (
    <div>
      <Modal
        title="创建房间"
        open={isModalOpen}
        onOk={handleOk}
        onCancel={() => {
          setIsModalOpen(false);
        }}
        style={{
          top: "30%",
        }}
        width="50%"
      >
        <Form disabled={formDisabled} initialValues={{roomSize:0}}>
          <Form.Item
            label="房间名称"
            name="roomName"
            rules={[
              {
                validator: async (_, value) => {
                  let lenth = value.replace(/[\u4e00-\u9fa5]/g, "  ").length;
                  if (lenth > 32)
                    return Promise.reject(
                      new Error("汉字不能超过16个字符,字母不能超过32个字符")
                    );
                },
              },
            ]}
          >
            <Input placeholder="请输入房间名称（为空将生成默认名称）" />
          </Form.Item>
          <Form.Item
            label="房间大小"
            name="roomSize"
            help="为0时表示大小无限制"
          >
            <InputNumber min={0} />
          </Form.Item>
          <Form.Item
            label="房间密码"
            name="roomPassword"
            rules={[
              {
                validator: async (_, value) => {
                  // 限制密码长度为0-30位
                  if (value.length > 30)
                    return Promise.reject(new Error("密码长度限制在30位以内"));
                },
              },
            ]}
          >
            <Input.Password
              placeholder="请输入房间密码（为空表示不设置密码）"
              maxLength={30}
            />
          </Form.Item>
        </Form>
      </Modal>
      <Title>嗨嗨嗨 终于来了奥 到达聊天最深处 聊天大厅</Title>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Title
          level={3}
          type="secondary"
          style={{
            textAlign: "center",
            margin: 0,
            marginRight: 20,
          }}
        >
          来看看现在有哪些房间
        </Title>
        <Button type="primary" onClick={refreshRoomsInfo}>
          刷新
        </Button>
      </div>
      <Divider />
      <Card
        loading={loading}
        style={{
          height: "100%",
          margin: "0 20%",
        }}
      >
        <div>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Title
              level={5}
              style={{
                margin: 0,
                marginRight: "auto",
              }}
            >
              房间总数：{roomsInfo != null ? Object.keys(roomsInfo).length : 0}
            </Title>
            <div
              style={{
                marginLeft: "auto",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Title
                type="secondary"
                level={5}
                style={{
                  margin: 0,
                }}
              >
                想要创建自己的房间？
              </Title>
              <Button type="primary" onClick={openModal}>
                {" "}
                创建房间{" "}
              </Button>
            </div>
          </div>

          <Divider />
          {roomsInfo != null && Object.keys(roomsInfo).length == 0 && <Empty />}
          {roomsInfo != null && Object.keys(roomsInfo).length > 0 && (
            <Row gutter={[16, 16]}>
              {Object.keys(roomsInfo).map((key) => {
                return (
                  <Col key={key} span={8}>
                    <Card
                      hoverable
                      title={roomsInfo[key].roomName}
                      onClick={() => {
                        cardOnclick(key);
                      }}
                    >
                      <div className="card-body">
                        <span>房间号：{key}</span>
                        <span>
                          房间大小：
                          {roomsInfo[key].roomSize == 0
                            ? "不限"
                            : roomsInfo[key].roomSize}
                        </span>
                        <span style={{ display: "flex" }}>
                          是否需要密码：
                          {roomsInfo[key].usePassword == true ? (
                            <>
                              <span>需要</span>
                              <LockOutlined style={{ marginLeft: "auto" }} />
                            </>
                          ) : (
                            <>
                              <span>不需要</span>
                              <UnlockOutlined style={{ marginLeft: "auto" }} />
                            </>
                          )}
                        </span>
                      </div>
                    </Card>
                  </Col>
                );
              })}
            </Row>
          )}
        </div>
      </Card>
      <Button onClick={stompService.createRoom}>创建房间</Button>
      <Link to="/chat/detail">加入案例</Link>
    </div>
  );
}

export default Hall;
