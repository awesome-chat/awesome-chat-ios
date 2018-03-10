import axios from 'axios';
// import {PushNotificationIOS} from 'react-native'
import { Toast } from 'antd-mobile';
import { initStorage, createStorage } from './storage';
import socketIo from 'socket.io-client'
let config = {}
if (process.env.NODE_ENV === 'development') {
  config = require('../config/dev.config')
} else {
  config = require('../config/pord.config')
}

createStorage()
initStorage()

// 建立socket连接
let socket;
// const socket = socketIo(config.url);

const io = axios.create({
  baseURL: config.url,
  timeout: 10000,
  withCredentials: true,
  responseType: 'json',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
})

const formIo = axios.create({
  baseURL: config.url,
  timeout: 10000,
  withCredentials: true,
  responseType: 'json',
  headers: {
    'Content-Type': 'multipart/form-data',
  },
})
// 获取authorization_user默认值
storage.load({
  key: 'authorization',
}).then(ret => {
  io.defaults.headers.common.authorization_user = ret.token;
}).catch(err => {
  io.defaults.headers.common.authorization_user = '';
})


function handleValidate(res) {
  const { authorization_user = null } = res.headers
  if (authorization_user) {
    storage.save({
      key: 'authorization',
      data: {
        token: authorization_user
      },
    });
    io.defaults.headers.common.authorization_user = authorization_user;
  }
  if (res.data.code === 2) {
    Toast.info('没有操作权限', 1);
  }
  return res
}

const api = {
  verifyUser(data = {}) {
    return io.post('/verify/user', data).then(handleValidate);
  },

  getUser(data = {}) {
    const { userId } = data;
    return io.get(`/user/${userId}`).then(handleValidate);
  },

  getDep(data = {}) {
    const { depId } = data;
    return io.get(`/dep/child/${depId}`).then(handleValidate);
  },

  createRoom(data = {}) {
    return io.post(`/room/create`, data).then(handleValidate);
  },
  // 获取单个群（用于创建群时判断群是否存在）
  getGroup(data = {}) {
    return io.get('/room/group/detail', data).then(handleValidate);
  },
  leaveGroup(data = {}) {
    return io.post('/room/group/leave', data).then(handleValidate);
  },
  // 获取群列表
  getGroupList({ userId }) {
    return io.get(`/room/group/list/${userId}`).then(handleValidate);
  },

  // 群详情
  getRoomDetail({ roomId }) {
    return io.get(`/room/group/detail/${roomId}`).then(handleValidate);
  },

  getMessage(data = {}) {
    const { userId, lastUpdateTime } = data;
    return io.get(`/message/${userId}/after/${lastUpdateTime}`).then(handleValidate);
  },

  searchUsers(data = {}) {
    const { value } = data;
    return io.get(`/user/search/${value}`).then(handleValidate);
  },

  resetPwd(data = {}) {
    return io.post('/user/password/', data).then(handleValidate);
  },

  sendFeedback(data = {}) {
    return io.post('/user/feedback/', data).then(handleValidate);
  },
  
  // 修改签名
  modifyPaganname(data = {}) {
    return io.post('/user/paganname/', data).then(handleValidate);
  },

  // 请假
  cottage(data = {}) {
    return io.post('/attendance/cottage/', data).then(handleValidate);
  },

  // 签到打卡
  signIn(data = {}) {
    return io.post('/attendance/signin/', data).then(handleValidate);
  },

  // 上传图片
  uploadImg(data) {
    return formIo.post('/img/upload/', data).then(handleValidate);
  },
  // 上传头像
  uploadAvatar(data) {
    return formIo.post('/img/avatar/', data).then(handleValidate);
  },
  // socket相关
  createGroup(data = {}) {
    socket.emit('createGroup', data)
  },
  // 
  connect() {
    socket = socketIo(config.url);
  },
  // 离线
  disconnect() {
    socket.disconnect()
  },

  userOnline(data = {}) {
    socket.emit('online', data.userId)
  },

  listernMessage(cb) {
    socket.on('sys', (data) => {
      cb(data)
    })
  },

  sendMessage(data = {}) {
    socket.emit('message', data)
  },

};

export default api;