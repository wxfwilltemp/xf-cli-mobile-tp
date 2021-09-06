import ReactDom from 'react-dom';
import RouterFn from './router/index';
import { setRem } from './utils/index';

// rem适配
import 'amfe-flexible';
// antd-mobile样式
// import 'antd-mobile/es/index.css';
// 全局css
import './main.css';
// redux
import { Provider } from 'react-redux';
import store from './store/index';
// 持久化
import { PersistGate } from 'redux-persist/lib/integration/react';
import { persistor } from './store/index';
// ajax
import api from './http/index';
// 挂载全局
window.http = api;
// pc 端最大为750px
setRem();
window.onresize = () => {
  setRem();
};

const App = (): any => {
  return (
    <PersistGate loading={null} persistor={persistor}>
      <Provider store={store}>
        <RouterFn />
      </Provider>
    </PersistGate>
  );
};

ReactDom.render(<App></App>, document.getElementById('root'));
