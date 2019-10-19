import {USER, EVENT, VOUCHER, NOTIFICATION, VOUCHERITEM, SCHEDULE, PRIZE, FLIGHTS, TRANSFER, EVENTITEM} from '~/reducers/types';

const INITIAL_STATE = {
  user: [],
  event: [],
  eventitem: [],
  voucher: [],
  voucheritem: [],
  notification: [],
  schedule: [],
  prizes: [],
  flights: [],
  transfer: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER:
      return {...state, user: action.payload};
    case EVENT:
      return {...state, event: action.payload};
    case EVENTITEM:
      return {...state, eventitem: action.payload};
    case VOUCHER:
      return {...state, voucher: action.payload};
    case VOUCHERITEM:
      return {...state, voucheritem: action.payload};
    case NOTIFICATION:
      return {...state, notification: action.payload};
    case SCHEDULE:
      return {...state, schedule: action.payload};
    case PRIZE:
      return {...state, prizes: action.payload};
    case FLIGHTS:
      return {...state, flights: action.payload};
    case TRANSFER:
      return {...state, transfer: action.payload};
    default:
      return state;
  }
};
