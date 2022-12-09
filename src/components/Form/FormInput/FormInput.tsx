import { useField } from 'formik';

import styles from './FormInput.module.scss';

type InputProps = {
  label: string;
  name: string;
  validate?: (value: any) => undefined | string | Promise<any>;
  type?: string;
  multiple?: boolean;
  value?: string;
  props?: any;
};

const FormInput = ({ label, ...props }: InputProps) => {
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
