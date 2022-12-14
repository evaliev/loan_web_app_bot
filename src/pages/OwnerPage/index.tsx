import { useContext, useEffect, useRef, useState } from 'react';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import 'dayjs/locale/ru';
import { Form, Formik, FormikProps } from 'formik';

import styles from './styles.module.scss';
import { ActionTypes, OwnerInfo } from '../../state/types';
import { PageStatuses } from '../types';
import { ContextApp } from '../../state/context';
import FormInput from '../../components/Form/FormInput/FormInput';
import { useTransport, useTelegramBtns } from '../../hooks';
import { OwnerValidationSchema } from '../Validation/Validation';
import transport from '../../transport';
import MaskedStyledInput from '../../components/MaskedInput';
import { LoadingPage } from '../../components/LoadingPage';

export const OwnerPage = () => {
  const { state, dispatch } = useContext(ContextApp);
  const [docDate, setDocDate] = useState<Dayjs | null>(dayjs());
  const formRef = useRef<FormikProps<OwnerInfo>>(null);

  useTelegramBtns({
    mainBtnTitle: 'Готово',
    mainBtnHandler: () => {
      formRef.current?.handleSubmit();
    },
    hasBackBtn: true,
    backBtnHandler: () => {
      initGoBackRequest();
    },
  });

  const initSubmitRequest = useTransport(async () => {
    await transport.updateOwnerInfo(state.applicationId, state.ownerInfo);

    const application = await transport.changeApplicationStatus(
      state.applicationId,
      PageStatuses.DATA_PAGE,
    );

    dispatch({
      type: ActionTypes.SET_APPLICATION_DATA,
      payload: application,
    });
  });

  const initGoBackRequest = useTransport(async () => {
    const application = await transport.changeApplicationStatus(
      state.applicationId,
      PageStatuses.DATA_PAGE,
    );

    dispatch({
      type: ActionTypes.SET_APPLICATION_DATA,
      payload: application,
    });
  });

  if (state.isLoading) {
    return <LoadingPage />;
  }

  return (
    <>
      <Formik
        initialValues={state.ownerInfo}
        innerRef={formRef}
        validationSchema={OwnerValidationSchema}
        onSubmit={() => {
          initSubmitRequest();
        }}
      >
        {({ values, setFieldValue }: FormikProps<OwnerInfo>) => {
          useEffect(() => {
            dispatch({
              type: ActionTypes.CHANGE_OWNER_INFO,
              payload: values,
            });
          }, [values]);

          return (
            <Form>
              <h2 className={styles.cardTitle}>ФИО</h2>
              <div className={styles.card}>
                <FormInput type="text" name="secondName" label="Фамилия" />
                <FormInput type="input" name="firstName" label="Имя" />
                <FormInput type="input" name="middleName" label="Отчество" />
              </div>
              <br />
              <h2 className={styles.cardTitle}>Паспорт</h2>
              <div className={styles.card}>
                <MaskedStyledInput
                  mask="0000 000000"
                  type="input"
                  name="docNumber"
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
                    value={docDate}
                    showToolbar={false}
                    componentsProps={{
                      actionBar: {
                        actions: ['accept'],
                      },
                    }}
                    onChange={(newValue) => {
                      setDocDate(newValue);
                      setFieldValue(
                        'docDate',
                        dayjs(newValue).format('DD.MM.YYYY'),
                        true,
                      );
                    }}
                    renderInput={(params) => (
                      <FormInput
                        type="input"
                        name="docDate"
                        onKeyDown={(e) => e.preventDefault()}
                        {...(params as React.InputHTMLAttributes<HTMLInputElement>)}
                        label="Дата выдачи"
                      />
                    )}
                  />
                </LocalizationProvider>
                <FormInput type="input" name="docIssuedBy" label="Кем выдан" />
                <FormInput
                  type="input"
                  name="birthPlace"
                  label="Место рождения"
                />
                <FormInput
                  type="input"
                  name="address"
                  label="Адрес регистрации"
                />
              </div>
            </Form>
          );
        }}
      </Formik>

      {/* DebugBar */}
      {process.env.NODE_ENV === 'development' && (
        <>
          <button
            style={{
              position: 'fixed',
              bottom: 0,
              right: 0,
              width: 200,
              height: 50,
            }}
            onClick={initSubmitRequest}
          >
            Готово
          </button>
          <button
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: 200,
              height: 50,
            }}
            onClick={initGoBackRequest}
          >
            go_back
          </button>
        </>
      )}
    </>
  );
};
