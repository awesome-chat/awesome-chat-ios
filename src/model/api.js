import axios from 'axios';
import {PushNotificationIOS} from 'react-native'
import { Toast } from 'antd-mobile';
import { initStorage, createStorage } from './storage';
import socketIo from 'socket.io-client'
let config = {}
if (process.env.NODE_ENV === 'development') {
  config = require('../config/dev.config')
} else {
  config = require('../config/pord.config')
}

import PushNotification from 'react-native-push-notification';

// PushNotification.configure({
//   // (optional) Called when Token is generated (iOS and Android)
//   // onRegister: function (token) {
//   //   console.log('TOKEN:', token);
//   // },
//   // (required) Called when a remote or local notification is opened or received
//   onNotification: function (notification) {
//     console.log('NOTIFICATION:', notification);
//     // process the notification
//     // required on iOS only (see fetchCompletionHandler docs: https://facebook.github.io/react-native/docs/pushnotificationios.html)
//     PushNotificationIOS.presentLocalNotification({
//       alertBody: 'test'
//     })
//     notification.finish(PushNotificationIOS.FetchResult.NoData);
//   },
//   // IOS ONLY (optional): default: all - Permissions to register.
//   permissions: {
//     alert: true,
//     badge: true,
//     sound: true
//   },
//   // Should the initial notification be popped automatically
//   // default: true
//   popInitialNotification: true,
//   /**
//     * (optional) default: true
//     * - Specified if permissions (ios) and token (android and ios) will requested or not,
//     * - if not, you must call PushNotificationsHandler.requestPermissions() later
//     */
//   requestPermissions: true,
// });

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

  // 签到打卡
  signIn(data = {}) {
    return io.post('/user/signin/', data).then(handleValidate);
  },

  // 上传图片
  uploadImg(data) {
    return formIo.post('/img/upload/', data).then(handleValidate);
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
      console.log('get message', data)
      PushNotificationIOS.presentLocalNotification({
        alertBody: data.content
      })
      // PushNotification.localNotification({
      //   /* iOS and Android properties */
      //   // title: "My Notification Title", // (optional, for iOS this is only used in apple watch, the title will be the app name on other iOS devices)
      //   // message: "My Notification Message", // (required)
      //   // playSound: false, // (optional) default: true
      //   // soundName: 'default', // (optional) Sound to play when the notification is shown. Value of 'default' plays the default sound. It can be set to a custom sound such as 'android.resource://com.xyz/raw/my_sound'. It will look for the 'my_sound' audio file in 'res/raw' directory and play it. default: 'default' (default sound is played)
      //   // repeatType: 'day', // (Android only) Repeating interval. Could be one of `week`, `day`, `hour`, `minute, `time`. If specified as time, it should be accompanied by one more parameter 'repeatTime` which should the number of milliseconds between each interval
      //   // actions: '["Yes", "No"]',  // (Android only) See the doc for notification actions to know more
      //   foreground: false, // BOOLEAN: If the notification was received in foreground or not
      //   userInteraction: false, // BOOLEAN: If the notification was opened by the user from the notification area or not
      //   message: 'My Notification Message', // STRING: The notification message
      //   data: {
      //     title: 'hi'
      //   }, // OBJECT: The push data
      // });
      cb(data)
    })
  },

  sendMessage(data = {}) {
    socket.emit('message', data)
  },

};

export default api;