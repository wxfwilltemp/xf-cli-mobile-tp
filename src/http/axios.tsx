import axios from 'axios';
import config from './config';
import { Loading, Toast } from 'antd-mobile';
import { createBrowserHistory } from 'history';
import store from '../store/index';

const history = createBrowserHistory({ forceRefresh: true });

// 请求次数
let repeat_count = 0;

const ajax = function $axios(options: any) {
  return new Promise((resolve: any, reject: any) => {
    const instance = axios.create({
      baseURL: config.baseUrl,
      headers: config.headers,
      timeout: config.timeout,
      withCredentials: config.withCredentials,
    });

    // request 拦截器
    instance.interceptors.request.use(
      (configOpt: any) => {
        if (!options.isTips) {
          // Loading();
          <Loading></Loading>;
        }
        configOpt.headers['Auth-Token'] = store.getState()?.userReducer?.token || null;
        return configOpt;
      },

      (error) => {
        // 请求错误时
        console.log(error);
        // 1. 判断请求超时
        if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
          // return instance.request(originalRequest);// 再重复请求一次
        }
        return Promise.reject(error); // 在调用的那边可以拿到(catch)你想返回的错误信息
      },
    );
    // response 拦截器
    instance.interceptors.response.use(
      (response) => {
        // Toast.clear();
        let data;
        // IE9时response.data是undefined，因此需要使用response.request.responseText(Stringify后的字符串)
        if (response.data === undefined) {
          data = JSON.parse(response.request.responseText);
        } else {
          data = response.data;
        }
        const { headers } = response;
        console.log(response);

        // 文件下载响应的文件流
        if (
          headers['content-type'] &&
          headers['content-type'].indexOf('application/octet-stream') > -1
        ) {
          return response.data;
        }
        // 根据返回的code值来做不同的处理
        if (data.code === 0 || data.code === 200) {
          return data;
        }
        if (data.code === 401) {
          // token过期
          data && Toast.show({ content: data?.msg });
          store.dispatch({ type: 'TOKEN', token: null });
          history.push('/kwy/service-app/login');
          return;
        }
        Toast.show({ content: data?.msg || 'msg为空' });
        // if (data.code === 10001) {
        //   // token过期
        //   data && Toast.show({ content: data?.msg });
        //   // token
        //   // React.store.dispatch({ type: 'USER_TOKEN', token: null });
        //   // // 用户信息 USER_INFO
        //   // React.store.dispatch({ type: 'USER_INFO', userInfo: '' });
        // } else if (!options.isTips) {
        //   data && Toast.show({ content: data?.msg });
        // }
      },
      (err) => {
        let error = JSON.parse(JSON.stringify(err));
        if (error.code === 'ECONNABORTED' && error.message.indexOf('timeout') !== -1) {
          // return instance.request(originalRequest); // 再重复请求一次
          // 请求处理
          repeat_count += 1;
          if (repeat_count > config.retry) {
            repeat_count = 0;
            return;
          }
          // 重新在请求一次
          return instance(options)
            .then((res) => {
              resolve(res);
              return false;
            })
            .catch((errormsg) => {
              reject(errormsg);
            });
        }
        return Promise.reject(err);
      },
    );

    // 请求处理
    instance(options)
      .then((res) => {
        resolve(res);
        return false;
      })
      .catch((error) => {
        reject(error);
      });
  });
};

export default ajax;
