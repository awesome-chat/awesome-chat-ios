import axios from 'axios';

const io = axios.create({
  baseURL: 'http://localhost:3000/',
  timeout: 10000,
  withCredentials: true,
  responseType: 'json',
  headers: {
    'X-Requested-With': 'XMLHttpRequest',
  },
})

function handleError(response) {
  return response;
}

const api = {
  verifyUser(data = {}) {
    return io.post('/verify', data).then(handleError);
  },
};

export default api;