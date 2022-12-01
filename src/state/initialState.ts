import { PageStatuses } from '../pages/types';
import { State } from './types';

export const initialState: State = {
  conditions: {
    isFetched: false,
    isLoading: false,
    amount: 0,
    term: 0,
    monthlyPayment: 0,
    rate: 0,
  },
  status: PageStatuses.TERM_PAGE,
};
