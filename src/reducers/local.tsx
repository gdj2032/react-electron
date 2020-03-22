import { combineReducers } from 'redux';
import { createReducer } from 'redux-act';
import types from 'actions/types';

const typeBooks: any = types.books;
const typeTexts: any = types.texts;

const local = combineReducers({
  books: createReducer({
    [typeBooks]: (state, payload) => ({ ...state, ...payload.value }),
  }, {
    data: [],
  }),
  texts: createReducer({
    [typeTexts]: (state, payload) => ({ ...state, ...payload.value }),
  }, {
    data: [],
  }),
});

export default local;
