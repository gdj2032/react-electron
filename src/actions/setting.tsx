import types from './types';

const UPDATE = (type: any, value: any) => (dispatch: any) => {
  dispatch(types[type]({ type, value }));
};

export const updateSettings = (value: any) => (dispatch: any) => dispatch(UPDATE('updateSetting', value));

export const updateAccount = (value: any) => (dispatch: any) => dispatch(UPDATE('account', value));
