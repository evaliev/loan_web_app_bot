import styles from './LentData.module.css';
import FormInput from '../../components/Form/FormInput/FormInput';
import Form from '../../components/Form/Form';
import { LentValidationSchema } from '../Validation/Validation';

export const initialValues = {};
export type LentInitialValues = {
  name: string;
  address: string;
  telephone: string;
  inn: string;
};

export const LentDataPage = () => {
  const submit = () => console.log('submit');

  return (
    <div className={styles.page}>
      <div className={styles.cardHeader}>Данные организации</div>
      <div className={styles.card}>
        <Form
          submit={submit}
          initialValues={initialValues}
          validationSchema={LentValidationSchema}
        >
          <FormInput label="Наименование" type="input" name="name" />
          <FormInput label="ИНН" type="input" name="inn" />
          <FormInput label="Адрес" type="input" name="address" />
          <FormInput label="Телефон" type="input" name="telephone" />
        </Form>
      </div>
    </div>
  );
};
