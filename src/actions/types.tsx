import { createAction } from 'redux-act';

const types = {
  books: createAction('BOOKS'),
  text: createAction('TEXT'),
}

export default types;