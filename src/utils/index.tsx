// pc端展示最大为750px
export const setRem = () => {
  let htmlWidth = document.documentElement.clientWidth || document.body.clientWidth;
  let htmlDom = document.getElementsByTagName('html')[0];
  if (htmlWidth >= 750) {
    htmlDom.style.fontSize = '75px';
  }
};

/**
 * 使用a标签下载一个文件
 * @param {} url  pdf地址
 */
export const downLoadUrl = (url: string, fileName: string) => {
  let x = new XMLHttpRequest();
  x.open('GET', url, true);
  x.responseType = 'blob';
  x.onload = () => {
    let blob = x.response;
    if ('msSaveOrOpenBlob' in navigator) {
      // IE导出
      window.navigator?.msSaveOrOpenBlob(blob, fileName);
    } else {
      let a = document.createElement('a');
      a.download = fileName;
      a.href = window.URL.createObjectURL(blob);
      document.body.appendChild(a);
      a.click();
      a.remove();
    }
  };
  x.send();
};
/**
 * a 标签下载
 * 文件流的形式 blob
 * res 后台返回的文件流
 * file 当前文件
 */
export const createFileDown = (res: any, name: any) => {
  if (!res) {
    throw new Error('获取的文件流为空');
  }
  // const blob = res;
  const blob = new Blob([res], {
    type: 'application/pdf;chartset=UTF-8',
  });
  const fileName = res.name || name || '默认名字';
  if ('download' in document.createElement('a')) {
    // 非IE下载
    const elink = document.createElement('a');
    // elink.download = filename.split('filename=')[1];
    elink.download = fileName;
    elink.style.display = 'none';
    elink.href = URL.createObjectURL(blob);
    document.body.appendChild(elink);
    elink.click();
    URL.revokeObjectURL(elink.href); // 释放URL 对象
    document.body.removeChild(elink);
  } else {
    // IE10+下载
    navigator.msSaveBlob(blob, fileName);
  }
};

function padLeftZero(str: any) {
  return `00${str}`.substr(str.length);
}
/* 格式化时间戳
 */
export function formatDate(date: any, fmt: any) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, `${date.getFullYear()}`.substr(4 - RegExp.$1.length));
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds(),
  };
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = `${o[k]}`;
      fmt = fmt.replace(RegExp.$1, RegExp.$1.length === 1 ? str : padLeftZero(str));
    }
  }
  return fmt;
}

// 获取url参数
export const urlParse = (src: any) => {
  const url = decodeURIComponent(src) || null;
  const obj = {};
  const reg = /[?&][^?&]+=[^?&]+/g;
  const arr = url && url.match(reg);
  if (arr) {
    arr.forEach((item) => {
      const temArr = item.substring(1).split('=');
      const key = temArr[0];
      const val = temArr[1];
      obj[key] = val;
    });
  }
  return obj;
};
