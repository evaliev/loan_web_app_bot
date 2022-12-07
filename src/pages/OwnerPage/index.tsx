import { useContext, useState } from 'react';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ru';

import styles from './styles.module.scss';
import { ActionTypes } from '../../state/types';
import { PageStatuses } from '../types';
import { ContextApp } from '../../state/context';
import FormInput from '../../components/Form/FormInput/FormInput';
import { useTelegramBtns } from '../../hooks';
import { OwnerValidationSchema } from '../Validation/Validation';
import Form from '../../components/Form/Form';

export const initialValues = {};

export const OwnerPage = () => {
  const { dispatch } = useContext(ContextApp);

  useTelegramBtns({
    mainBtnTitle: 'Готово',
    mainBtnHandler: () => {
      dispatch({
        type: ActionTypes.CHANGE_STATUS,
        payload: PageStatuses.DATA_PAGE,
      });
    },
    hasBackBtn: true,
    backBtnHandler: () => {
      dispatch({
        type: ActionTypes.CHANGE_STATUS,
        payload: PageStatuses.DATA_PAGE,
      });
    },
  });

  const [value, setValue] = useState<Dayjs | null>(dayjs());

  const submit = () => console.log('submit');

  return (
    <>
      <h2 className={styles.cardTitle}>ФИО</h2>
      <Form
        submit={submit}
        initialValues={initialValues}
        validationSchema={OwnerValidationSchema}
      >
        <div className={styles.card}>
          <FormInput type="input" name="surname" label="Фамилия" />
          <FormInput type="input" name="name" label="Имя" />
          <FormInput type="input" name="midlename" label="Отчество" />
        </div>
        <br />
        <h2 className={styles.cardTitle}>Паспорт</h2>
        <div className={styles.card}>
          <FormInput type="input" name="seriesAndNumber" label="Серия номер" />
          <LocalizationProvider
            dateAdapter={AdapterDayjs}
            adapterLocale={'ru'}
            localeText={{
              cancelButtonLabel: 'Закрыть',
              okButtonLabel: 'Выбрать',
            }}
          >
            <MobileDatePicker
              disableFuture
              label="Выберите дату"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => (
                <FormInput
                  type="input"
                  name="issueDate"
                  label="Дата выдачи"
                  props={params}
                  value={dayjs(value).format('DD.MM.YYYY')}
                />
              )}
            />
          </LocalizationProvider>
          <FormInput type="input" name="issuedBy" label="Кем выдан" />
          <FormInput type="input" name="placeOfBirth" label="Место рождения" />
          <FormInput type="input" name="address" label="Адрес регистрации" />
        </div>
      </Form>
    </>
  );
};
