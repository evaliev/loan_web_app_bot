import { PageStatuses } from '../pages/types';
import { getMonthlyPaymentByTerm } from '../utils';
import { State } from './types';

export const initialState: State = {
  INN: null,
  amount: 400000,
  term: 12,
  monthlyPayment: getMonthlyPaymentByTerm(400000, 12),
  status: PageStatuses.LOGIN_PAGE,
};
