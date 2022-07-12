import axios from 'axios';

const backendPortNumber = process.env.REACT_APP_SERVER_PORT;
const serverUrl =
  'http://' + window.location.hostname + ':' + backendPortNumber + '/';

async function get(endpoint, params = '') {
  return axios.get(serverUrl + endpoint + params, {
    // JWT 토큰을 헤더에 담아 백엔드 서버에 보냄.
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
}

async function post(endpoint, data) {
  const bodyData = JSON.stringify(data);

  return axios.post(serverUrl + endpoint, bodyData, {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
}

async function put(endpoint, data) {
  const bodyData = JSON.stringify(data);

  return axios.put(serverUrl + endpoint, bodyData, {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: true,
  });
}

async function del(endpoint, params = '') {
  return axios.delete(serverUrl + endpoint + params, {
    withCredentials: true,
  });
}

async function getPdf(endpoint, params = '') {
  return axios.get(serverUrl + endpoint + params, {
    responseType: 'blob',
    withCredentials: true,
  });
}

async function postDiary(data) {
  const bodyData = JSON.stringify(data);
  const Url = 'https://kdt-ai4-team12.elicecoding.com/ai/predict';
  return axios.post(Url, bodyData, {
    headers: {
      'Content-Type': 'application/json',
    },
    withCredentials: false,
  });
}

export { get, post, put, del as delete, postDiary, getPdf };
