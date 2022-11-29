export interface State {
  amount: number;
  term: number;
  monthlyPayment: number;
}

export interface Action {
  type: ActionTypes;
  payload?: any;
}

export enum ActionTypes {
  AMOUNT_INCREASE = 'AMOUNT_INCREASE',
  AMOUNT_DECREASE = 'AMOUNT_DECREASE',
  TERM_INCREASE = 'TERM_INCREASE',
  TERM_DECREASE = 'TERM_DECREASE',
  MONTHLY_PAYMENT_INCREASE = 'MONTHLY_PAYMENT_INCREASE',
  MONTHLY_PAYMENT_DECREASE = 'MONTHLY_PAYMENT_DECREASE',
}
