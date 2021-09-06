import { createStore, combineReducers } from 'redux';

import userReducer from './reducers/userReducer';

// redux 持久化

import { persistStore, persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

const rootReducer = combineReducers({
  userReducer,
});
const persistConfig = {
  key: 'servive-root',
  storage,
  whitelist: ['userReducer'],
};

const myPersistReducer = persistReducer(persistConfig, rootReducer);

const initialzeSate = {};

const store = createStore(myPersistReducer, initialzeSate);

export const persistor = persistStore(store);

export default store;
