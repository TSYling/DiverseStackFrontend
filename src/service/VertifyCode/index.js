import service from "../../util/axoisUtil";
async function getLoginVertifyCode(data) {
  var status = false;
  // 登录获取 信息
  await service.post("/email/login", data).then((response) => {
    // 验证码发送成功
    status = response.data.msg
  }).catch(() => {
    status = false;
  });
  return status;
}
async function getRegisterVertifyCode(data) {
  var status = false;
  // 登录获取 信息
  await service
    .post("/email/register", data)
    .then((response) => {
      // 验证码发送成功
      status = response.data.msg;
    })
    .catch(() => {
      status = false;
    });
  return status;
}

export default { getLoginVertifyCode, getRegisterVertifyCode };
