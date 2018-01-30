import axios from 'axios';
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
const socket = socketIo(config.url);

const io = axios.create({
  baseURL: config.url,
  timeout: 10000,
  withCredentials: true,
  responseType: 'json',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
})

// 获取authorization_user默认值
storage.load({
  key: 'authorization',
}).then(ret => {
  io.defaults.headers.common.authorization_user = ret.token;
}).catch(err => {
  console.log(err.message);
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

  getMessage(data = {}) {
    const { userId, lastUpdateTime } = data;
    return io.get(`/message/${userId}/after/${lastUpdateTime}`).then(handleValidate);
  },

  searchUsers(data = {}) {
    const { value } = data;
    return io.get(`/user/search/${value}`).then(handleValidate);
  },

  // socket相关
  createGroup(data = {}) {
    socket.emit('createGroup', data)
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