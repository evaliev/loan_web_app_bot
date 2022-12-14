import { PageStatuses } from '../pages/types';
import { getMonthlyPaymentByTerm } from '../utils';
import { Conditions, IndiInfo, OwnerInfo, State } from './types';

export const initialConditions: Conditions = {
  amount: 400000,
  term: 12,
  monthlyPayment: getMonthlyPaymentByTerm(400000, 12),
};

export const initialOwnerInfo: OwnerInfo = {
  address: '',
  birthPlace: '',
  docDate: '',
  docIssuedBy: '',
  docNumber: '',
  firstName: '',
  middleName: '',
  secondName: '',
};

export const initialIndiInfo: IndiInfo = {
  address: '',
  INN: '',
  name: '',
  tel: '',
};

export const initialState: State = {
  isLoading: false,
  INN: null,
  chatId: '',
  applicationId: '',
  status: PageStatuses.LOGIN_PAGE,
  conditions: initialConditions,
  ownerInfo: initialOwnerInfo,
  indiInfo: initialIndiInfo,
};
