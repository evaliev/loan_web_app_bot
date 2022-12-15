import { Form, Formik, FormikProps } from 'formik';
import { useContext, useEffect, useRef } from 'react';

import styles from './styles.module.scss';
import FormInput from '../../components/Form/FormInput/FormInput';
import { IndiValidationSchema } from '../Validation/Validation';
import { useTransport, useTelegramBtns } from '../../hooks';
import { ActionTypes, IndiInfo } from '../../state/types';
import { PageStatuses } from '../types';
import { ContextApp } from '../../state/context';
import transport from '../../transport';
import MaskedStyledInput from '../../components/MaskedInput';

export const IndiDataPage = () => {
  const { state, dispatch } = useContext(ContextApp);
  const formRef = useRef<FormikProps<IndiInfo>>(null);

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
    await transport.updateIndiInfo(state.applicationId, state.indiInfo);

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

  return (
    <div className={styles.page}>
      <div className={styles.cardHeader}>Данные организации</div>
      <div className={styles.card}>
        <Formik
          initialValues={state.indiInfo}
          innerRef={formRef}
          validationSchema={IndiValidationSchema}
          onSubmit={() => {
            initSubmitRequest();
          }}
        >
          {({ values }: FormikProps<IndiInfo>) => {
            useEffect(() => {
              dispatch({
                type: ActionTypes.CHANGE_INDI_INFO,
                payload: values,
              });
            }, [values]);

            return (
              <Form>
                <FormInput label="Наименование" type="input" name="name" />
                <FormInput label="ИНН" type="input" name="INN" />
                <FormInput label="Адрес" type="input" name="address" />
                <MaskedStyledInput
                  mask="+{7} (000) 000-00-00"
                  label="Телефон"
                  type="input"
                  name="tel"
                />
              </Form>
            );
          }}
        </Formik>
      </div>

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
    </div>
  );
};
