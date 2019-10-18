import {USER, SCHEDULE, VOUCHER} from '~/reducers/types';

const INITIAL_STATE = {
  user: [],
  schedule: [],
  voucher: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER:
      return {...state, user: action.payload};
    case SCHEDULE:
      return {...state, schedule: action.payload};
    case VOUCHER:
      return {...state, voucher: action.payload};
    default:
      return state;
  }
};
