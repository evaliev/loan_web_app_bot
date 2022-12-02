import { PageStatuses } from '../pages/types';

export interface State {
  INN: number | null;
  amount: number;
  term: number;
  monthlyPayment: number;
  status: PageStatuses;
}

export interface Action {
  type: ActionTypes;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
}

export enum ActionTypes {
  CHANGE_INN = 'CHANGE_INN',
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
