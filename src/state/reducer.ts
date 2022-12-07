import { getMonthlyPaymentByTerm, getTermByMonthlyPayment } from '../utils';
import { Action, ActionTypes, State } from './types';

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.CHANGE_INN:
      return {
        ...state,
        INN: action.payload,
      };
    case ActionTypes.AMOUNT_CHANGE:
      return {
        ...state,
        amount: action.payload,
        monthlyPayment: getMonthlyPaymentByTerm(action.payload, state.term),
      };
    case ActionTypes.TERM_CHANGE:
      return {
        ...state,
        term: action.payload,
        monthlyPayment: getMonthlyPaymentByTerm(state.amount, action.payload),
      };
    case ActionTypes.MONTHLY_PAYMENT_CHANGE:
      return {
        ...state,
        monthlyPayment: action.payload,
        term: getTermByMonthlyPayment(state.amount, action.payload),
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
