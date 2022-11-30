import { PageStatuses } from '../pages/types';

export interface State {
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
  AMOUNT_INCREASE = 'AMOUNT_INCREASE',
  AMOUNT_DECREASE = 'AMOUNT_DECREASE',
  TERM_INCREASE = 'TERM_INCREASE',
  TERM_DECREASE = 'TERM_DECREASE',
  MONTHLY_PAYMENT_INCREASE = 'MONTHLY_PAYMENT_INCREASE',
  MONTHLY_PAYMENT_DECREASE = 'MONTHLY_PAYMENT_DECREASE',
  CHANGE_STATUS = 'CHANGE_STATUS',
}
