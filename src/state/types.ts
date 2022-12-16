import { AlertColor } from '@mui/material';

import { PageStatuses } from '../pages/types';

export interface Conditions {
  amount: number;
  term: number;
  monthlyPayment: number;
}

export interface OwnerInfo {
  firstName: string;
  secondName: string;
  middleName: string;
  docNumber: string;
  docDate: string;
  docIssuedBy: string;
  birthPlace: string;
  address: string;
}

export interface IndiInfo {
  name: string;
  INN: string;
  address: string;
  tel: string;
}

export interface State {
  isLoading: boolean;
  INN: number | null;
  chatId: string;
  applicationId: string;
  status: PageStatuses;
  conditions: Conditions;
  ownerInfo: OwnerInfo;
  indiInfo: IndiInfo;
  notification: { status: AlertColor | undefined; text: string } | null;
}

export interface Action {
  type: ActionTypes;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  payload?: any;
}

export enum ActionTypes {
  SET_IS_LOADING = 'SET_IS_LOADING',
  CHANGE_INN = 'CHANGE_INN',
  SET_CHAT_ID = 'SET_CHAT_ID',
  CHANGE_STATUS = 'CHANGE_STATUS',
  CHANGE_OWNER_INFO = 'CHANGE_OWNER_INFO',
  CHANGE_INDI_INFO = 'CHANGE_INDI_INFO',
  SET_APPLICATION_DATA = 'SET_APPLICATION_DATA',
  AMOUNT_CHANGE = 'AMOUNT_CHANGE',
  TERM_CHANGE = 'TERM_CHANGE',
  MONTHLY_PAYMENT_CHANGE = 'MONTHLY_PAYMENT_CHANGE',
  SET_NOTIFICATION = 'SET_NOTIFICATION',
}
