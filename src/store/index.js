const EventProxy = require('eventproxy');

const ep = new EventProxy();

ep.on('receiveMsg', () => {
  // 添加到storage中
})
export default ep;