const axios = require('axios')

axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem('token');
  config.headers.Authorization = token;
  return config;
}, function (error) {
  return Promise.reject(error);
});

axios.interceptors.response.use(function (response) {
  console.log(response.headers)
  const { authorization } = response.headers
  authorization && localStorage.setItem("token", authorization)
  return response.data;
}, function (error) {
  return Promise.reject(error);
});

module.exports = axios