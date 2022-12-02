import { FC } from 'react';

import styles from './FormInput.module.css';

export type FormInputProps = {
  label: string;
  type: string;
  name: string;
};

const FormInput: FC<FormInputProps> = ({ label, type, name }) => {
  return (
    <div className={styles.formInput}>
      <label>{label}</label>
      <input type={type} name={name} placeholder="заполните" />
    </div>
  );
};

export default FormInput;
