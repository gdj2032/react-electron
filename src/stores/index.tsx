import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import { persistStore, persistReducer } from 'redux-persist';
import rootReducer from 'reducers/index';
import storage from 'redux-persist/lib/storage';

const config = {
  key: 'key',
  storage: storage,
  blacklist: [],
};

const __dev__ = process.env.NODE_ENV === 'development';

export default function createAppStore() {
  const store = createStore(
    persistReducer(config, rootReducer),
    __dev__ ? applyMiddleware(thunk, logger) : applyMiddleware(thunk),
  );
  const persistor: any = persistStore(store);
  return { store, persistor };
}
