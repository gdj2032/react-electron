import { combineReducers } from 'redux';
import { createReducer } from 'redux-act';
import types from 'actions/types';

const typeBooks: any = types.books;
const typeText: any = types.text;

const local = combineReducers({
  books: createReducer({
    [typeBooks]: (state, payload) => ({ ...state, ...payload.value }),
  }, {
    data: [],
  }),
  text: createReducer({
    [typeText]: (state, payload) => ({ ...state, ...payload.value }),
  }, {
    data: [],
  }),
});

export default local;
