import { PageStatuses } from '../pages/types';

export interface AuthDto {
  INN: string;
  chatId: string;
}

export interface ConditionsDto {
  amount: number;
  term: number;
}

export interface IndiInfoDto {
  name: string;
  INN: string;
  address: string;
  tel: string;
}

export interface OwnerInfoDto {
  firstName: string;
  secondName: string;
  middleName: string;
  docNumber: string;
  docDate: string;
  docIssuedBy: string;
  birthPlace: string;
  address: string;
}

export interface ApplicationDto {
  id: string;
  chatId: string;
  status: PageStatuses;
  conditions: ConditionsDto;
  indiInfo: IndiInfoDto;
  ownerInfo: OwnerInfoDto;
}