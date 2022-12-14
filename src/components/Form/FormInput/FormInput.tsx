import { useField } from 'formik';
import { FC, forwardRef } from 'react';

import styles from './FormInput.module.scss';

type InputProps = React.InputHTMLAttributes<HTMLInputElement> & {
  label: string;
  name: string;
  [x: string]: unknown;
};

const FormInput: FC<InputProps> = forwardRef<HTMLInputElement, InputProps>(
  ({ label, ...props }, ref) => {
    const [field, meta] = useField(props);
    return (
      <>
        <div className={styles.formInput}>
          <div className={styles.inputWrap}>
            <label>{label}</label>
            <input {...field} {...props} placeholder="заполните" ref={ref} />
          </div>
          {meta.touched && meta.error ? (
            <div className={styles.formError}>{meta.error}</div>
          ) : null}
        </div>
      </>
    );
  },
);

FormInput.displayName = 'FormInput';

export default FormInput;
