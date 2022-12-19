import { PageStatuses } from '../pages/types';

export interface LoginDto {
  chatId: string;
}

export interface RegistryDto {
  INN: string;
  chatId: string;
  reCaptchaToken: string | null;
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
