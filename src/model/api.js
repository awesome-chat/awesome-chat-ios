import axios from 'axios';
import { Toast } from 'antd-mobile';
import { initStorage, createStorage } from './storage';
import socketIo from 'socket.io-client'

createStorage()
initStorage()

// 建立socket连接
const socket = socketIo('http://localhost:3000');

const io = axios.create({
  baseURL: 'http://localhost:3000/',
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
  console.warn(err.message);
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

  getRoomId(data = {}) {
    const { userId, otherSideId } = data;
    return io.get(`/room/from/${userId}/to/${otherSideId}`).then(handleValidate);
  },

  getMessage(data = {}) {
    const { userId } = data;
    console.log('userId', userId)
    return io.get(`/message/${userId}`).then(handleValidate);
  },

  userOnline(data = {}) {
    console.log('online', data.userId)
    socket.emit('online', data.userId)
  },

  sendMessage(data = {}) {
    socket.emit('join', data.roomId, data.userId)
    socket.on('sys', (msg) => {
      console.log('get messsage:', msg)
    })
    socket.emit('message', data)
  },
};

export default api;