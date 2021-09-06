import { TOKEN } from '../actionTypes';

const initState = {
  token: null,
};

export default (state = initState, action: any) => {
  switch (action.type) {
    case TOKEN:
      return {
        ...state,
        token: action.token,
      };
    default:
      return state;
  }
};
