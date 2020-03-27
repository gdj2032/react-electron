import { createReducer } from 'redux-act';
import types from 'actions/types';

const typeLocal: any = types.local;

const local = {
  local: createReducer({
    [typeLocal]: (state, payload) => ({ ...state, ...payload.value }),
  }, {
    books: [],
    texts: [],
  }),
}

export default local;
