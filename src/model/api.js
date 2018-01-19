import axios from 'axios';
import { Toast } from 'antd-mobile';
import createStorage from './storage';

createStorage()

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
console.log('global.storage', global.storage)
if(global.storage) {
  storage.load({
    key: 'authorization',
  }).then(ret => {
    console.log(ret.token);
    io.defaults.headers.common.authorization_user = ret.token;
  }).catch(err => {
    console.warn(err.message);
    io.defaults.headers.common.authorization_user = '';
  })
}


function handleError(res) {
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
    return io.post('/verify/user', data).then(handleError);
  },

  getUser(data = {}) {
    const { userId } = data;    
    return io.get(`/user/${userId}`).then(handleError);
  },

  getDep(data = {}) {
    const { depId } = data;
    return io.get(`/dep/child/${depId}`).then(handleError);
  },
};

export default api;