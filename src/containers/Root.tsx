import * as React from 'react';
import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/es/integration/react';//在typings文件夹内忽略此错误
import createAppStore from 'stores';
import RouteContainer from './RouteContainer';

const { store, persistor } = createAppStore();

const Root = () => (
  <Provider store={store}>
    <PersistGate persistor={persistor} loading={null}>
      <RouteContainer />
    </PersistGate>
  </Provider>
);

export default Root;
