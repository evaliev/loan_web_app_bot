import { FC } from 'react';

import styles from './FormInput.module.scss';

export type FormInputProps = {
  label: string;
  type: string;
  name: string;
  props?: any;
  value?: string;
  form?: any;
  OnchangeHandler?: () => void;
};

const FormInput: FC<FormInputProps> = ({
  label,
  type,
  name,
  props,
  form,
  OnchangeHandler,
}) => {
  return (
    <div className={styles.formInput}>
      <label>{label}</label>
      <input
        type={type}
        name={name}
        placeholder="заполните"
        {...props}
        value={form.values.value}
        onChange={(e) => {
          if (OnchangeHandler) {
            OnchangeHandler();
          }
          form.setFieldValue(name, e.target.value);
          form.setFieldTouched(name, false, false);
          form.setFieldError(name, {});
        }}
        onBlur={form.handleBlur}
      />
      {form.touched[name] && form.errors[name] ? (
        <span className={styles.formError}>{form.errors[name]}</span>
      ) : null}
    </div>
  );
};

export default FormInput;
