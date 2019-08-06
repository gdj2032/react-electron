import { createAction } from 'redux-act';

const types = {
  account: createAction('ACCOUNT'),
  localProfile: createAction('LOCAL_PROFILE'),
  updateSetting: createAction('UPDATE_SETTING'),
}

export default types;