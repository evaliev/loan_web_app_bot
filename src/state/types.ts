import { PageStatuses } from '../pages/types';

export interface State {
  conditions: {
    isFetched: boolean;
    isLoading: boolean;
    amount: number;
    term: number;
    monthlyPayment: number;
    rate: number;
  };
  status: PageStatuses;
}

export interface Action {
  type: ActionTypes;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
}

export enum ActionTypes {
  CHANGE_LOADING_CONDIONS_STATUS = 'CHANGE_LOADING_CONDIONS_STATUS',
  SET_CONDITIONS = 'SET_CONDITIONS',
  AMOUNT_INCREASE = 'AMOUNT_INCREASE',
  AMOUNT_DECREASE = 'AMOUNT_DECREASE',
  AMOUNT_CHANGE = 'AMOUNT_CHANGE',
  TERM_INCREASE = 'TERM_INCREASE',
  TERM_DECREASE = 'TERM_DECREASE',
  TERM_CHANGE = 'TERM_CHANGE',
  MONTHLY_PAYMENT_INCREASE = 'MONTHLY_PAYMENT_INCREASE',
  MONTHLY_PAYMENT_DECREASE = 'MONTHLY_PAYMENT_DECREASE',
  MONTHLY_PAYMENT_CHANGE = 'MONTHLY_PAYMENT_CHANGE',
  CHANGE_STATUS = 'CHANGE_STATUS',
}
