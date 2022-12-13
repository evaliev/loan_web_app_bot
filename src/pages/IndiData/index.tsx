import { Form, Formik, FormikProps } from 'formik';

import { useContext, useMemo, useRef } from 'react';

import styles from './styles.module.scss';
import FormInput from '../../components/Form/FormInput/FormInput';
import { IndiValidationSchema } from '../Validation/Validation';
import { useTelegramBtns } from '../../hooks';
import { ActionTypes } from '../../state/types';
import { PageStatuses } from '../types';
import { ContextApp } from '../../state/context';

type IndiInitialValues = {
  companyName: string;
  inn: string;
  address: string;
  telephone: string;
};

export const IndiDataPage = () => {
  const { dispatch, state } = useContext(ContextApp);

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

  const initialValues = useMemo(
    () => ({
      companyName: '',
      inn: String(state.INN),
      address: '',
      telephone: '',
    }),
    [],
  );

  const formRef = useRef<FormikProps<IndiInitialValues>>(null);

  return (
    <div className={styles.page}>
      <div className={styles.cardHeader}>Данные организации</div>
      <div className={styles.card}>
        <Formik
          validationSchema={IndiValidationSchema}
          onSubmit={(values) => {
            alert(JSON.stringify(values, null, 2));
            dispatch({
              type: ActionTypes.CHANGE_STATUS,
              payload: PageStatuses.DATA_PAGE,
            });
          }}
          initialValues={initialValues}
          innerRef={formRef}
        >
          <Form>
            <FormInput label="Наименование" type="input" name="companyName" />
            <FormInput label="ИНН" type="input" name="inn" disabled />
            <FormInput label="Адрес" type="input" name="address" />
            <FormInput label="Телефон" type="input" name="telephone" />
          </Form>
        </Formik>
      </div>
    </div>
  );
};
