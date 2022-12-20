import { getMonthlyPaymentByTerm, getTermByMonthlyPayment } from '../utils';
import { Action, ActionTypes, State } from './types';

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.SET_IS_LOADING:
      return {
        ...state,
        isLoading: action.payload,
      };
    case ActionTypes.SET_NOTIFICATION:
      return {
        ...state,
        notification: action.payload,
      };
    case ActionTypes.CHANGE_INN:
      return {
        ...state,
        INN: action.payload,
      };
    case ActionTypes.CHANGE_STATUS:
      return {
        ...state,
        status: action.payload,
      };
    case ActionTypes.CHANGE_OWNER_INFO:
      return {
        ...state,
        ownerInfo: action.payload,
      };
    case ActionTypes.CHANGE_INDI_INFO:
      return {
        ...state,
        indiInfo: action.payload,
      };
    case ActionTypes.SET_APPLICATION_DATA:
      return {
        ...state,
        applicationId: action.payload.id,
        status: action.payload.status,
        conditions: {
          ...action.payload.conditions,
          monthlyPayment: getMonthlyPaymentByTerm(
            action.payload.conditions.amount,
            action.payload.conditions.term,
          ),
        },
        ownerInfo: action.payload.ownerInfo,
        indiInfo: action.payload.indiInfo,
      };
    case ActionTypes.AMOUNT_CHANGE:
      return {
        ...state,
        conditions: {
          ...state.conditions,
          amount: action.payload,
          monthlyPayment: getMonthlyPaymentByTerm(
            action.payload,
            state.conditions.term,
          ),
        },
      };
    case ActionTypes.TERM_CHANGE:
      return {
        ...state,
        conditions: {
          ...state.conditions,
          term: action.payload,
          monthlyPayment: getMonthlyPaymentByTerm(
            state.conditions.amount,
            action.payload,
          ),
        },
      };
    case ActionTypes.MONTHLY_PAYMENT_CHANGE:
      return {
        ...state,
        conditions: {
          ...state.conditions,
          monthlyPayment: action.payload,
          term: getTermByMonthlyPayment(
            state.conditions.amount,
            action.payload,
          ),
        },
      };
    default:
      return state;
  }
};
