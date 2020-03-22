import { createAction } from 'redux-act';

const types = {
  books: createAction('BOOKS'),
  texts: createAction('TEXTS'),
}

export default types;