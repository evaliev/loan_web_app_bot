import { Form, Formik, FormikProps } from 'formik';

import styles from './LentData.module.css';
import FormInput from '../../components/Form/FormInput/FormInput';
import { LentValidationSchema } from '../Validation/Validation';

const initialValues = {
  name: '',
  address: '',
  telephone: '',
  inn: '',
};

type LentInitialValues = {
  name: string;
  address: string;
  telephone: string;
  inn: string;
};

export const LentDataPage = () => {
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
              <FormInput label="Наименование" type="input" name="firstName" />
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
