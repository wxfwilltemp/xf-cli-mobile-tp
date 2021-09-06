import styles from './login.less';
import HelloSvg from '@/assets/img/hello.svg';

const Login = () => {
  return (
    <div className={styles.login}>
      <div className="inner-content">
        <p>基于 webpack5 + react + redux + typescript + axios 简易脚手架</p>
        <img src={HelloSvg} alt="hello" className="welcome" />
        <p className="txt_desc">
          注意：默认UI框架为antd-moblie@5.0.0-alpha.20版本，待v5版本发布后，同步更新UI框架
        </p>
      </div>
    </div>
  );
};

export default Login;
