import { PageStatuses } from '../pages/types';
import { State } from './types';

export const initialState: State = {
  amount: 100000,
  term: 12,
  monthlyPayment: 3600,
  status: PageStatuses.TERM_PAGE,
};
