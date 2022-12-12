import { useContext, useRef, useState } from 'react';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ru';
import { Form, Formik, FormikProps } from 'formik';

import styles from './styles.module.scss';
import { ActionTypes } from '../../state/types';
import { PageStatuses } from '../types';
import { ContextApp } from '../../state/context';
import FormInput from '../../components/Form/FormInput/FormInput';
import { useTelegramBtns } from '../../hooks';
import { OwnerValidationSchema } from '../Validation/Validation';

const initialValues = {
  firstName: '',
  lastName: '',
  middlename: '',
  seriesAndNumber: '',
  issueDate: '',
  issuedBy: '',
  placeOfBirth: '',
  address: '',
};
type Values = {
  firstName: string;
  lastName: string;
  middlename: string;
  seriesAndNumber: string;
  issueDate: string;
  issuedBy: string;
  placeOfBirth: string;
  address: string;
};
export const OwnerPage = () => {
  const { dispatch } = useContext(ContextApp);

  useTelegramBtns({
    mainBtnTitle: 'Готово',
    mainBtnHandler: () => {
      formRef.current && formRef.current.handleSubmit();
    },
    hasBackBtn: true,
    backBtnHandler: () => {
      dispatch({
        type: ActionTypes.CHANGE_STATUS,
        payload: PageStatuses.DATA_PAGE,
      });
    },
  });
  const formRef = useRef<FormikProps<Values>>(null);

  const [value, setValue] = useState<Dayjs | null>(null);

  return (
    <>
      <Formik
        validationSchema={OwnerValidationSchema}
        initialValues={initialValues}
        innerRef={formRef}
        onSubmit={(values) => {
          alert(JSON.stringify(values, null, 2));
          dispatch({
            type: ActionTypes.CHANGE_STATUS,
            payload: PageStatuses.DATA_PAGE,
          });
        }}
      >
        {({ setFieldValue }: FormikProps<Values>) => (
          <Form>
            <h2 className={styles.cardTitle}>ФИО</h2>
            <div className={styles.card}>
              <FormInput type="text" name="lastName" label="Фамилия" />
              <FormInput type="input" name="firstName" label="Имя" />
              <FormInput type="input" name="middlename" label="Отчество" />
            </div>
            <br />
            <h2 className={styles.cardTitle}>Паспорт</h2>
            <div className={styles.card}>
              <FormInput
                type="input"
                name="seriesAndNumber"
                label="Серия номер"
              />
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
                  showToolbar={false}
                  componentsProps={{
                    actionBar: {
                      actions: ['accept'],
                    },
                  }}
                  onChange={(newValue) => {
                    setValue(newValue);
                    setFieldValue(
                      'issueDate',
                      dayjs(newValue).format('DD.MM.YYYY'),
                      true,
                    );
                  }}
                  renderInput={(params) => (
                    <FormInput
                      type="input"
                      name="issueDate"
                      {...params}
                      label="Дата выдачи"
                    />
                  )}
                />
              </LocalizationProvider>
              <FormInput type="input" name="issuedBy" label="Кем выдан" />
              <FormInput
                type="input"
                name="placeOfBirth"
                label="Место рождения"
              />
              <FormInput
                type="input"
                name="address"
                label="Адрес регистрации"
              />
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};
