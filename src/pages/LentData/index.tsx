import styles from './LentData.module.css';
import FormInput from '../../components/Form/FormInput/FormInput';
import Form from '../../components/Form/Form';

// const initialValues = {
//
// };

export const LentDataPage = () => {
  const submit = () => console.log('submit');
  return (
    <div className={styles.page}>
      <div className={styles.cardHeader}>Данные организации</div>
      <div className={styles.card}>
        <Form submit={submit}>
          <FormInput label="Наименование" type="input" name="name" />
          <FormInput label="ИНН" type="input" name="inn" />
          <FormInput label="Адрес" type="input" name="address" />
          <FormInput label="Телефон" type="input" name="telephone" />
        </Form>
      </div>
    </div>
  );
};
