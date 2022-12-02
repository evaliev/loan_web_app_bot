import { useCallback, useContext, useState } from 'react';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import TextField from '@mui/material/TextField';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';

import styles from './styles.module.scss';
import { DetailLine } from '../../components/DetailLine';
import { ActionTypes } from '../../state/types';
import { PageStatuses } from '../types';
import { ContextApp } from '../../state/context';
import FormInput from '../../components/Form/FormInput/FormInput';

export const OwnerPage = () => {
  const { dispatch } = useContext(ContextApp);

  const handleClick = useCallback(() => {
    dispatch({
      type: ActionTypes.CHANGE_STATUS,
      payload: PageStatuses.TERM_PAGE,
    });
  }, []);

  //   useTelegramBtns({
  //     mainBtnTitle: 'Отправить заявку',
  //     mainBtnHandler: () => {
  //       dispatch({
  //         type: ActionTypes.CHANGE_STATUS,
  //         payload: PageStatuses.SUCCESS_PAGE,
  //       });
  //     },
  //     hasBackBtn: true,
  //     backBtnHandler: () => {
  //       dispatch({
  //         type: ActionTypes.CHANGE_STATUS,
  //         payload: PageStatuses.TERM_PAGE,
  //       });
  //     },
  //   });

  const [value, setValue] = useState<Dayjs | null>(null);
  const handleChange = (newValue: Dayjs | null) => {
    setValue(newValue);
  };

  return (
    <>
      {/* <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Basic example"
              value={value}
              onChange={(newValue) => {
                setValue(newValue);
              }}
              renderInput={(params) => (
                <FormInput
                  type="text"
                  name="date"
                  props={params}
                  label="Дата выдачи"
                />
              )}
            />
          </LocalizationProvider> */}
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
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Basic example"
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
