import {USER, EVENT, VOUCHER, NOTIFICATION, VOUCHERITEM, SCHEDULE} from '~/reducers/types';

const INITIAL_STATE = {
  user: [],
  event: [],
  voucher: [],
  voucheritem: [],
  notification: [],
  schedule: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER:
      return {...state, user: action.payload};
    case EVENT:
      return {...state, event: action.payload};
    case VOUCHER:
      return {...state, voucher: action.payload};
    case VOUCHERITEM:
      return {...state, voucheritem: action.payload};
    case NOTIFICATION:
      return {...state, notification: action.payload};
    case SCHEDULE:
      return {...state, schedule: action.payload};
    default:
      return state;
  }
};
