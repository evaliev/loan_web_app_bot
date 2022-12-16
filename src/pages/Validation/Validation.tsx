import * as Yup from 'yup';

const DEFAULT_ERROR_REQUIRED = 'Обязательное поле';
const ERROR_FORMAT = 'Не соответствует формату';
export const REG_ADDRESS_ERROR_REQUIRED =
  'Необходимо указать адрес регистрации';

const PHONE_NUMBER_MATCH = /[+]7.\(\d{3}\).\d{3}-\d{2}-\d{2}/;
const DOC_SERIES_AND_NUMBER_MATCH =
  /^(?!00|02|06|13|16|21|23|31)[0-9]{4}(\s|)[0-9]{6}$/;
const VALIDATE_NAME = /^[А-Яа-яЁё -]+$/;
const VALIDATE_ISSUEDBY = /^[А-Яа-яЁё]+([А-Яа-я0-9 .Ёё№'-]+[А-Яа-яЁё0-9]+)*$/;
const VALIDATE_PLACE = /^[А-Яа-яЁё]+(.+[А-Яа-яЁё0-9]+)*$/;

export const IndiValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required(DEFAULT_ERROR_REQUIRED)
    .max(50, DEFAULT_ERROR_REQUIRED)
    .matches(VALIDATE_NAME, ERROR_FORMAT),
  INN: Yup.string()
    .min(12, ERROR_FORMAT)
    .max(12, ERROR_FORMAT)
    .required(DEFAULT_ERROR_REQUIRED),
  address: Yup.string()
    .max(1000, ERROR_FORMAT)
    .required(REG_ADDRESS_ERROR_REQUIRED),
  tel: Yup.string()
    .matches(PHONE_NUMBER_MATCH, ERROR_FORMAT)
    .required(DEFAULT_ERROR_REQUIRED),
});

export const OwnerValidationSchema = Yup.object().shape({
  firstName: Yup.string()
    .required(DEFAULT_ERROR_REQUIRED)
    .max(50, DEFAULT_ERROR_REQUIRED)
    .matches(VALIDATE_NAME, ERROR_FORMAT),
  secondName: Yup.string()
    .required(DEFAULT_ERROR_REQUIRED)
    .max(50, DEFAULT_ERROR_REQUIRED)
    .matches(VALIDATE_NAME, ERROR_FORMAT),
  middlename: Yup.string()
    .required(DEFAULT_ERROR_REQUIRED)
    .max(50, DEFAULT_ERROR_REQUIRED)
    .matches(VALIDATE_NAME, ERROR_FORMAT),
  docNumber: Yup.string()
    .required(DEFAULT_ERROR_REQUIRED)
    .matches(DOC_SERIES_AND_NUMBER_MATCH, ERROR_FORMAT),
  docDate: Yup.string().required(DEFAULT_ERROR_REQUIRED),
  docIssuedBy: Yup.string()
    .required(DEFAULT_ERROR_REQUIRED)
    .max(500, ERROR_FORMAT)
    .matches(VALIDATE_ISSUEDBY, ERROR_FORMAT),
  birthPlace: Yup.string()
    .required(DEFAULT_ERROR_REQUIRED)
    .max(200, DEFAULT_ERROR_REQUIRED)
    .matches(VALIDATE_PLACE, ERROR_FORMAT),
  address: Yup.string()
    .required(REG_ADDRESS_ERROR_REQUIRED)
    .max(1000, DEFAULT_ERROR_REQUIRED),
});
