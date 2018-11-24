import { USER_UPDATE } from "../actions/types";

const INITIAL_STATE = {
    amount: null,
    date: null,
    type: null,
    note: '',
    repeating: null
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_UPDATE: 
        // action.payload === { prop: 'name', value: 'jane' }
        return { ...state, [action.payload.prop]: action.payload.value };
    default:
      return state;
  }
};
