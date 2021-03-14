import uri from "./uri";
import axios from "axios";

const prefix = '';

let reqs = {
  getStore: () => {
    const user = JSON.parse(localStorage.getItem("Echo-4G-USER") || '{}');
    const userMock = JSON.parse(localStorage.getItem("Echo-4G-USER-MOCK") || '{}');
    return userMock.mock ? userMock : user;
  },
  setStore: (user, key) => {
    const userMock = JSON.parse(localStorage.getItem("Echo-4G-USER-MOCK") || '{}');
    key = key || (userMock.mock ? "Echo-4G-USER-MOCK" : "Echo-4G-USER");
    localStorage.setItem(key, JSON.stringify(user));
  },
};

function doGet(uri, params = '', route = false) {
  if (route) {
    uri += params ? ('/' + params) : '';
  } else {
    // 组装参数
    let p = [];
    for (let i of Object.keys({ ...params })) {
      p.push(`${i}=${params[i]}`);
    }
    if (p.length > 0) {
      uri += '?' + p.join('&');
    }
  }
  let user = reqs.getStore();
  return new Promise((resolve) => {
    axios({
      method: 'get',
      url: prefix + uri,
      headers: {
        token: user.loginToken
      }
    })
      .then((response) => {
        if (response.data.status === -3) {
          localStorage.removeItem("Echo-4G-USER");
          return;
        }
        resolve(response.data);
      })
      .catch((error) => {
        if (error.response) {
          resolve(error.response?.data);
        }
      });
  });
}

function doPost(uri, data, query) {
  // 组装参数
  let p = [];
  for (let i of Object.keys({ ...data })) {
    p.push(`${i}=${data[i]}`);
  }
  let user = reqs.getStore();
  return new Promise((resolve) => {
    axios({
      method: 'post',
      url: prefix + uri,
      data: query ? p.join('&') : data,
      headers: {
        token: user.loginToken
      }
    })
      .then((response) => {
        if (response.data.status === -3) {
          localStorage.removeItem("Echo-4G-USER");
          return;
        }
        resolve(response.data);
      })
      .catch((error) => {
        if (error.response) {
          resolve(error.response?.data);
        }
      });
  });
}

for (let i of Object.keys(uri)) {
  const [url, method, query] = uri[i].split(' ');
  if (method === 'post') {
    reqs[i] = (body) => doPost(url, body, query);
  } else {
    reqs[i] = (params) => doGet(url, params, query);
  }
}

export default reqs;
