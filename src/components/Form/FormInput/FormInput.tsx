import { FC } from 'react';
import { useFormikContext } from 'formik';

import styles from './FormInput.module.scss';

export type FormInputProps = {
  id: string;
  label: string;
  type: string;
  name: string;
  props?: any;
  value?: string;
  form?: any;
};

const FormInput: FC<FormInputProps> = ({
  id,
  label,
  type,
  name,
  props,
  form,
}) => {
  // const context = useFormikContext<IFormData>(); return
  return (
    <div className={styles.formInput}>
      <label>{label}</label>
      <input
        id={id}
        type={type}
        name={name}
        placeholder="заполните"
        {...props}
        value={form.values.value}
        onChange={form.handleChange}
        onBlur={form.handleBlur}
      />
      {form.touched.name && form.errors.name ? (
        <span className={styles.formError}>{form.errors.name}</span>
      ) : null}
    </div>
  );
};

export default FormInput;
