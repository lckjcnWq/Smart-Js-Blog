import axios from 'axios';
import {Message} from 'element-ui';

axios.defaults.timeout = 5000;
axios.defaults.baseURL = 'http://47.104.168.67:8080/';
// axios.defaults.baseURL = 'http://localhost:80/';
axios.defaults.headers['Content-Type'] = 'application/x-www-form-urlencoded; charset=UTF-8';
axios.defaults.withCredentials = true
// axios.interceptors.request.use(function (config) {
//   // 在发送请求之前做些什么
//   if (config.method == 'get') {
//     config.data = true
//     axios.defaults.headers['Content-Type'] = 'application/json; charset=UTF-8';
//   }
//   console.log("我走了这里00")
//   return config;
// }, function (error) {
//   // 对请求错误做些什么
//   return Promise.reject(error);
// });


/**
 * 封装post请求
 * @param url
 * @param data
 * @returns {Promise}
 */

export function post(url, data) {
  return (
    axios.post(url, data)
      .then((res) => {
        console.log("请求到的数据:" + res);
      }).catch((error) => {
      console.log("返回的错误信息:" + error);
    })
  )
}
