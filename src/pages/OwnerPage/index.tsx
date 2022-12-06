import { useContext, useState } from 'react';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ru';

import { Input, TextField } from '@mui/material';

import styles from './styles.module.scss';
import { ActionTypes } from '../../state/types';
import { PageStatuses } from '../types';
import { ContextApp } from '../../state/context';
import FormInput from '../../components/Form/FormInput/FormInput';
import { useTelegramBtns } from '../../hooks';

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

  return (
    <>
      <h2 className={styles.cardTitle}>ФИО</h2>
      <div className={styles.card}>
        <FormInput type="text" name="date" label="Фамилия" />
        <FormInput type="text" name="date" label="Имя" />
        <FormInput type="text" name="date" label="Отчество" />
      </div>
      <br />
      <h2 className={styles.cardTitle}>Паспорт</h2>
      <div className={styles.card}>
        <FormInput type="text" name="date" label="Серия номер" />
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
                type="text"
                name="date"
                label="Дата выдачи"
                props={params}
                value={dayjs(value).format('DD.MM.YYYY')}
              />
            )}
          />
        </LocalizationProvider>

        <FormInput type="text" name="date" label="Кем выдан" />
        <FormInput type="text" name="date" label="Место рождения" />
        <FormInput type="text" name="date" label="Адрес регистрации" />
      </div>
    </>
  );
};
