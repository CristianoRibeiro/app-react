import {USER, SCHEDULE} from '~/reducers/types';

const INITIAL_STATE = {
  user: [],
  schedule: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER:
      return {...state, user: action.payload};
    case SCHEDULE:
      return {...state, schedule: action.payload};
    default:
      return state;
  }
};
