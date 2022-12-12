import { Form, Formik, FormikProps } from 'formik';

import { useContext } from 'react';

import styles from './styles.module.scss';
import FormInput from '../../components/Form/FormInput/FormInput';
import { LentValidationSchema } from '../Validation/Validation';
import { useTelegramBtns } from '../../hooks';
import { ActionTypes } from '../../state/types';
import { PageStatuses } from '../types';
import { ContextApp } from '../../state/context';

const initialValues = {
  companyName: '',
  inn: '',
  address: '',
  telephone: '',
};

type LentInitialValues = {
  companyName: string;
  inn: string;
  address: string;
  telephone: string;
};

export const IndiDataPage = () => {
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

  return (
    <div className={styles.page}>
      <div className={styles.cardHeader}>Данные организации</div>
      <div className={styles.card}>
        <Formik
          validationSchema={LentValidationSchema}
          onSubmit={async (values) => {
            await new Promise((r) => setTimeout(r, 500));
            alert(JSON.stringify(values, null, 2));
          }}
          initialValues={initialValues}
        >
          {(props: FormikProps<LentInitialValues>) => (
            <Form>
              <FormInput label="Наименование" type="input" name="companyName" />
              <FormInput label="ИНН" type="input" name="inn" />
              <FormInput label="Адрес" type="input" name="address" />
              <FormInput label="Телефон" type="input" name="telephone" />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
