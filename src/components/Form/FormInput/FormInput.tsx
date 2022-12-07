import { FC } from 'react';
import { ErrorMessage, Field } from 'formik';

import styles from './FormInput.module.scss';

export type FormInputProps = {
  label: string;
  type: string;
  name: string;
  props?: any;
  value?: string;
  OnchangeHandler?: () => void;
};

const FormInput: FC<FormInputProps> = ({
  label,
  type,
  name,
  props,
  OnchangeHandler,
}) => {
  return (
    <>
      <div className={styles.formInput}>
        <label>{label}</label>
        <Field
          type={type}
          name={name}
          placeholder="заполните"
          {...props}
          onChange={OnchangeHandler}
        />
      </div>
      <span className={styles.formError}>
        <ErrorMessage name={name} />
      </span>
    </>
  );
};

export default FormInput;
