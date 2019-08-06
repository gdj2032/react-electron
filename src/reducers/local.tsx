import { combineReducers } from 'redux';
import { createReducer } from 'redux-act';
import types from 'actions/types';

const typesAccount: any = types.account;
const typesLocalProfile: any = types.localProfile;
const typesUpdateSetting: any = types.updateSetting;

const local = combineReducers({
  account: createReducer({
    [typesAccount]: (state, payload) => ({ ...state, ...payload.value }),
  }, {
      name: 'name',
      arr: ['1', '2', '3', '4', '5'],
      count: 0,
    }),
  profile: createReducer({
    [typesLocalProfile]: (state, payload) => ({ ...state, ...payload.value }),
  }, {
      dateOfBirth: [],
    }),
  updateSetting: createReducer({
    [typesUpdateSetting]: (state, payload) => ({ ...state, ...payload.value }),
  }, {
      updateSetting: 'updateSetting',
    })
});

export default local;
