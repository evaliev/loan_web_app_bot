import * as Yup from 'yup';

const DEFAULT_ERROR_REQUIRED = 'Обязательное поле';
const ERROR_FORMAT = 'Не соответствует формату';
const LATE_DATE = 'Дата должна быть не позднее текущей';
const EARLY_DATE = 'Дата должна быть не ранее 01.01.1900';
const INVALID_ISSUE_OR_BIRTH_DATE =
  'Проверьте корректность даты рождения и даты выдачи паспорта';
export const REG_ADDRESS_ERROR_REQUIRED =
  'Необходимо указать адрес регистрации';

const PHONE_NUMBER_MATCH = /^(?![0-9]([0-9])\1{9})/;
const DOC_SERIES_AND_NUMBER_MATCH =
  /^(?!00|02|06|13|16|21|23|31)[0-9]{4}(\s|)[0-9]{6}$/;
const DOC_DEPARTMENT_CODE_MATCH = /^(?!(\d)\1{5})\d{6}$/;
const VALIDATE_NAME = /^[А-Яа-яЁё -]+$/;
const VALIDATE_ISSUEDBY = /^[А-Яа-яЁё]+([А-Яа-я0-9 .Ёё№'-]+[А-Яа-яЁё0-9]+)*$/;
const VALIDATE_PLACE = /^[А-Яа-яЁё]+(.+[А-Яа-яЁё0-9]+)*$/;

export const LentValidationSchema = Yup.object().shape({
  Name: Yup.string()
    .required(DEFAULT_ERROR_REQUIRED)
    .max(50, DEFAULT_ERROR_REQUIRED)
    .matches(VALIDATE_NAME, ERROR_FORMAT),
  INN: Yup.string()
    .min(10, ERROR_FORMAT)
    .max(10, ERROR_FORMAT)
    .required(DEFAULT_ERROR_REQUIRED),
  address: Yup.string()
    .max(1000, ERROR_FORMAT)
    .required(REG_ADDRESS_ERROR_REQUIRED),
  tel: Yup.string()
    .matches(PHONE_NUMBER_MATCH, ERROR_FORMAT)
    .min(11, ERROR_FORMAT)
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
    .max(1000, DEFAULT_ERROR_REQUIRED)
    .matches(VALIDATE_NAME, ERROR_FORMAT),
});
