import { combineReducers } from 'redux';
import local from './local';
import { reduxStore } from 'utils/visible';

const appReducer = combineReducers({
  local,
});

const rootReducer = (state: any, action: any) => {
  console.log(state, action);
  if(state) {
    reduxStore.getState = state;
  }
  return appReducer({...state}, {...action});
};


export default rootReducer;