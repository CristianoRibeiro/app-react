import {
  USER,
  EVENT,
  VOUCHER,
  NOTIFICATION,
  VOUCHERITEM,
  SCHEDULE,
  PRIZE,
  FLIGHTS,
  TRANSFER,
  EVENTITEM,
  BANNER,
  CAMPAIGNS,
  QUIZZES,
  CARDS,
  COUPONS,
  REGULATION
} from '~/reducers/types';

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
  banner: [],
  campaigns: [],
  quizzes: [],
  cards: [],
  coupons: [],
  regulation: [],
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
    case BANNER:
      return {...state, banner: action.payload};
    case CAMPAIGNS:
      return {...state, campaigns: action.payload};
    case QUIZZES:
      return {...state, quizzes: action.payload};
    case CARDS:
      return {...state, cards: action.payload};
    case COUPONS:
      return {...state, coupons: action.payload};
    case REGULATION:
      return {...state, regulation: action.payload};
    default:
      return state;
  }
};
