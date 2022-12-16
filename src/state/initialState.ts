import { PageStatuses } from '../pages/types';
import { getMonthlyPaymentByTerm } from '../utils';
import { Conditions, IndiInfo, OwnerInfo, State } from './types';

export const initialConditions: Conditions = {
  amount: 1000000,
  term: 36,
  monthlyPayment: getMonthlyPaymentByTerm(1000000, 36),
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
  notification: null,
};
