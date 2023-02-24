import axios, { AxiosError, AxiosResponse } from 'axios';
import { BASE_URL } from '@/config';
import { checkStatus } from './check/checkStatus';
import { setToken } from '@/store/features/tokenSlice';
import { message } from 'antd';
import { store } from '@/store';

// 实例
const serve = axios.create({
  baseURL: BASE_URL, // Base URL
   // 设置超时时间（10s）
  timeout: 10000,
  withCredentials: true, // 跨域
});
/**
 * @description 请求拦截器
 * 客户端发送请求 -> [请求拦截器] -> 服务器
 * token校验(JWT) : 接受服务器返回的token,存储到redux/本地储存当中
 */
serve.interceptors.request.use(
  (config: any) => {
    const token: string = store.getState().token.value;     
    token && (config.headers.Authorization = token);  
    return config
  },
  (error: AxiosError) => {
    return Promise.reject(error);
  }
);
/**
 * @description 响应拦截器
 *  服务器换返回信息 -> [拦截统一处理] -> 客户端JS获取到信息
 */
serve.interceptors.response.use(
  (response: AxiosResponse) => {
    const { data } = response;
    if (data.code === '401') {
      store.dispatch(setToken(''));
      message.error(data.msg);
      window.location.hash = '/login';
      return Promise.reject(data);
    }
    // * 全局错误信息拦截（防止下载文件得时候返回数据流，没有code，直接报错）
    if (data.code && data.code !== 200) {
      message.error(data.msg);
      return Promise.reject(data);
    }
    // * 成功请求（在页面上除非特殊情况，否则不用处理失败逻辑）
    return data;
  },
  async (error: AxiosError) => {
    const { response } = error;
    // 请求超时单独判断，请求超时没有 response
    if (error.message.indexOf('timeout') !== -1) message.error('请求超时，请稍后再试');
    // 根据响应的错误状态码，做不同的处理
    if (response) checkStatus(response.status);
    // 无响应500
    if (!window.navigator.onLine) window.location.hash = '/500';
    return Promise.reject(error);
  }
);

export default serve;
