import { useField } from 'formik';
import { FC } from 'react';

import styles from './FormInput.module.scss';

type InputProps = {
  label: string;
  name: string;
  [x: string]: unknown;
};

const FormInput: FC<InputProps> = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <div className={styles.formInput}>
        <div className={styles.inputWrap}>
          <label>{label}</label>
          <input {...field} {...props} placeholder="заполните" />
        </div>
        {meta.touched && meta.error ? (
          <div className={styles.formError}>{meta.error}</div>
        ) : null}
      </div>
    </>
  );
};

export default FormInput;
