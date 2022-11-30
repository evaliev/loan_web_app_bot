import { Action, ActionTypes, State } from './types';

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.AMOUNT_INCREASE:
      return {
        ...state,
        amount: state.amount + 100,
      };
    case ActionTypes.AMOUNT_DECREASE:
      return {
        ...state,
        amount: state.amount - 100,
      };
    case ActionTypes.AMOUNT_CHANGE:
      return {
        ...state,
        amount: action.payload,
      };
    case ActionTypes.TERM_INCREASE:
      return {
        ...state,
        term: state.term + 1,
      };
    case ActionTypes.TERM_DECREASE:
      return {
        ...state,
        term: state.term - 1,
      };
    case ActionTypes.TERM_CHANGE:
      return {
        ...state,
        term: action.payload,
      };
    case ActionTypes.MONTHLY_PAYMENT_INCREASE:
      return {
        ...state,
        monthlyPayment: state.monthlyPayment + 100,
      };
    case ActionTypes.MONTHLY_PAYMENT_DECREASE:
      return {
        ...state,
        monthlyPayment: state.monthlyPayment - 100,
      };
    case ActionTypes.MONTHLY_PAYMENT_CHANGE:
      return {
        ...state,
        monthlyPayment: action.payload,
      };
    case ActionTypes.CHANGE_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    default:
      return state;
  }
};