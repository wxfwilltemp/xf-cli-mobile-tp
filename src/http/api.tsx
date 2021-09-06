// 通用相关接口
import axios from './axios';
import configs from './config';

const postData = ({ url, data, config, responseType }: any) => {
  return axios({
    url,
    method: 'post',
    data,
    responseType: responseType || configs.responseType,
    headers: config && config.headers ? config.headers : configs.headers,
  });
};

const getData = ({ url, data, config, responseType }: any) => {
  return axios({
    url,
    method: 'get',
    params: data,
    responseType: responseType || configs.responseType,
    headers: config && config.headers ? config.headers : configs.headers,
  });
};

// 默认全部导出
export default {
  postData,
  getData,
};
