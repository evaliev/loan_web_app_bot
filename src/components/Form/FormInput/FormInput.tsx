import { FC, useContext } from 'react';

import { FormContext } from '../Form';
import styles from './FormInput.module.css';

export type FormInputProps = {
  label: string;
  type: string;
  name: string;
};

const FormInput: FC<FormInputProps> = ({ label, type, name }) => {
  const formContext = useContext(FormContext);
  // const { form, handleFormChange } = formContext;

  return (
    <div className={styles.formInput}>
      <label>{label}</label>
      <input
        type={type}
        name={name}
        placeholder="заполните"
        // value={form[name]}
        // onChange={handleFormChange}
      />
    </div>
  );
};

export default FormInput;
