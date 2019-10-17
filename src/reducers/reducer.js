import {
  USER,
} from "~/reducers/types";

const INITIAL_STATE = {
  user: [],
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER:
      return { ...state, user: action.payload };
    
    default:
      return state;
  }
}