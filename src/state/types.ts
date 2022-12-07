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
  AMOUNT_CHANGE = 'AMOUNT_CHANGE',
  TERM_CHANGE = 'TERM_CHANGE',
  MONTHLY_PAYMENT_CHANGE = 'MONTHLY_PAYMENT_CHANGE',
  CHANGE_STATUS = 'CHANGE_STATUS',
}
