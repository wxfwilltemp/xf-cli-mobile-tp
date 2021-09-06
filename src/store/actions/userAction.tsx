import { TOKEN } from '../actionTypes';

const saveToken = (token: any) => {
  return {
    type: TOKEN,
    token,
  };
};

export { saveToken };
