import axios from 'axios'
import router from '@/router'
import config from '../../config/config'
import cache from "@/utils/cache";
import { Message } from 'element-ui'

/*
* 创建 axios
* */
const request = axios.create({
  baseURL: config.baseURL || '/',
  timeout: 60000,
  responseType: 'json',
  withCredentials: false, // 是否允许带cookie这些
})

/*
* 请求拦截
* */
request.interceptors.request.use(config => {
  if (config.method === 'get') {
    config.params &&
    Object.keys(config.params).forEach((item) => {
      if (
          config.params[item] === null ||
          config.params[item] === undefined
      ) {
        config.params[item] = ''
      }
    });
  } else {
    config.data &&
    Object.keys(config.data).forEach((item) => {
      if (config.data[item] === null || config.data[item] === undefined) {
        config.data[item] = ''
      }
    })
  }
  let token = cache.local.get('token')
  if (token) {
    config.headers['Authorization'] = 'Bearer ' + token;
  }
  return config
})

/*
* 相应拦截
* */
request.interceptors.response.use(response => {
  // 401, token失效
  if (response.data && response.data.code === 401) {
    cache.local.remove('token')
    router.push({name: 'login'}).then()
   } else {
    return response
  }
}, error => {
  if (error.message.substring(0, 10) === 'timeout of') { // 请求超时，提示错误（timeout of 6000ms exceeded）
    Message.error(`请求超时：${error.config.timeout / 1000}秒`)
    console.error(`请求超时：${error.config.timeout / 1000}秒 ${error.config.baseURL}${error.config.url}?${error.config.data}`)
  } else if (error.message === 'Network Error') { // 网络不通，提示错误
    Message.error('连接服务器失败')
    console.error(`连接服务器失败：${error.config.baseURL}${error.config.url}?${error.config.data}`)
  } else {
    Message.error(error.message) // 其他错误，提示错误
    console.error(`请求未知错误：${error.config.baseURL}${error.config.url}?${error.config.data}`)
  }
  return Promise.reject(new Error(error))
})

export default request
