import { USER_DEBIT_UPDATE, USER_CREDIT_UPDATE, USER_CREATE } from "../actions/types";

const INITIAL_STATE = {
    debitProp: null,
    debitAmount: null,
    debitDate: null,
    debitType: null,
    debitNote: '',
    debitRepeating: null,
    creditProp: null,
    creditAmount: null,
    creditDate: null,
    creditType: null,
    creditNote: '',
    creditRepeating: null
};
export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case USER_DEBIT_UPDATE: 
        // action.payload === { prop: 'name', value: 'jane' }
        return { ...state, [action.payload.prop]: action.payload.value };
    case USER_CREDIT_UPDATE: 
        // action.payload === { prop: 'name', value: 'jane' }
        return { ...state, [action.payload.prop]: action.payload.value };
    case USER_CREATE:
        return INITIAL_STATE ;
    default:
      return state;
  }
};
