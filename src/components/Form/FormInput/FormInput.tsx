import { FC } from 'react';

import styles from './FormInput.module.scss';

export type FormInputProps = {
  label: string;
  type: string;
  name: string;
  props?: any;
  value?: string;
};

const FormInput: FC<FormInputProps> = ({ label, type, name, props, value }) => {
  return (
    <div className={styles.formInput}>
      <label>{label}</label>
      <input
        type={type}
        name={name}
        placeholder="заполните"
        {...props}
        value={value}
      />
    </div>
  );
};

export default FormInput;
