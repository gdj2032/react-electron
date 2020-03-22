import types from './types';

const UPDATE = (type: any, value: any) => (dispatch: any) => {
  dispatch(types[type]({ type, value }));
};


export const updateBooks = (value: any) => (dispatch: any) => dispatch(UPDATE('books', value));

export const updateText = (value: any) => (dispatch: any) => dispatch(UPDATE('text', value));
