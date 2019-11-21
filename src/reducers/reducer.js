import {
  USER,
  USERS,
  INDICATED,
  CONVERTED,
  EVENT,
  VOUCHER,
  NOTIFICATION,
  VOUCHERITEM,
  SCHEDULE,
  PRIZE,
  PRIZECAMPAIGN,
  FLIGHTS,
  TRANSFER,
  EVENTITEM,
  BANNER,
  CAMPAIGNS,
  QUIZZES,
  CARDS,
  COUPONS,
  REGULATION,
  LOTTERY,
  NEWS,
  BANNERCAMPAIGNS,
  MATCHS,
  MATCHITEM,
  GAMES
} from '~/reducers/types';

const INITIAL_STATE = {
  user: [],
  users: [],
  indicated: [],
  converted: [],
  event: [],
  eventitem: [],
  voucher: [],
  voucheritem: [],
  notification: [],
  schedule: [],
  prizes: [],
  prizecampaigns: [],
  flights: [],
  transfer: [],
  banner: [],
  bannercampaigns: [],
  campaigns: [],
  quizzes: [],
  cards: [],
  coupons: [],
  regulation: [],
  lottery: [],
  news: [],
  matchs: [],
  matchitem: [],
  games: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER:
      return {...state, user: action.payload};
    case USERS:
      return {...state, users: action.payload};
    case INDICATED:
      return {...state, indicated: action.payload};
    case CONVERTED:
      return {...state, converted: action.payload};
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
    case PRIZECAMPAIGN:
      return {...state, prizecampaigns: action.payload};
    case FLIGHTS:
      return {...state, flights: action.payload};
    case TRANSFER:
      return {...state, transfer: action.payload};
    case BANNER:
      return {...state, banner: action.payload};
    case BANNERCAMPAIGNS:
      return {...state, bannercampaigns: action.payload};
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
    case LOTTERY:
      return {...state, lottery: action.payload};
    case NEWS:
      return {...state, news: action.payload};
    case MATCHS:
      return {...state, matchs: action.payload};
    case MATCHITEM:
      return {...state, matchitem: action.payload};
    case GAMES:
      return {...state, games: action.payload};
    default:
      return state;
  }
};
