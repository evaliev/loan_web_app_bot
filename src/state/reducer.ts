import { Action, ActionTypes, State } from './types';

export const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case ActionTypes.CHANGE_LOADING_CONDIONS_STATUS:
      return {
        ...state,
        conditions: {
          ...state.conditions,
          isLoading: action.payload,
        },
      };
    case ActionTypes.SET_CONDITIONS:
      return {
        ...state,
        conditions: {
          isFetched: true,
          ...action.payload,
        },
      };
    case ActionTypes.AMOUNT_INCREASE:
      return {
        ...state,
        conditions: {
          ...state.conditions,
          amount: state.conditions.amount + 100,
        },
      };
    case ActionTypes.AMOUNT_DECREASE:
      return {
        ...state,
        conditions: {
          ...state.conditions,
          amount: state.conditions.amount - 100,
        },
      };
    case ActionTypes.AMOUNT_CHANGE:
      return {
        ...state,
        conditions: {
          ...state.conditions,
          amount: action.payload,
        },
      };
    case ActionTypes.TERM_INCREASE:
      return {
        ...state,
        conditions: {
          ...state.conditions,
          term: state.conditions.term + 1,
        },
      };
    case ActionTypes.TERM_DECREASE:
      return {
        ...state,
        conditions: {
          ...state.conditions,
          term: state.conditions.term - 1,
        },
      };
    case ActionTypes.TERM_CHANGE:
      return {
        ...state,
        conditions: {
          ...state.conditions,
          term: action.payload,
        },
      };
    case ActionTypes.MONTHLY_PAYMENT_INCREASE:
      return {
        ...state,
        conditions: {
          ...state.conditions,
          monthlyPayment: state.conditions.monthlyPayment + 100,
        },
      };
    case ActionTypes.MONTHLY_PAYMENT_DECREASE:
      return {
        ...state,
        conditions: {
          ...state.conditions,
          monthlyPayment: state.conditions.monthlyPayment - 100,
        },
      };
    case ActionTypes.MONTHLY_PAYMENT_CHANGE:
      return {
        ...state,
        conditions: {
          ...state.conditions,
          monthlyPayment: action.payload,
        },
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
