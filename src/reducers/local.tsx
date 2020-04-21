import { createReducer } from 'redux-act';
import types from 'actions/types';

const typeLocal: any = types.local;

const local = {
  local: createReducer({
    [typeLocal]: (state, payload) => ({ ...state, ...payload.value }),
  }, {
    books: [],
    texts: [],
    fontSize: 14,
    lineHeight: 30,
    fontColor: '#000000',
    backgroundColor: 'rgba(255, 255, 255, 1)',
    automaticNext: false,
    automaticSpeed: 10,//十秒1页默认
    isFirst: true,
  }),
}

export default local;
