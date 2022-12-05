import React, { Children, cloneElement, FC, ReactElement } from 'react';
import { useFormik, validateYupSchema } from 'formik';

import styles from './Form.module.css';

export type LentInitialValues = {
  name: string;
  address: string;
  telephone: string;
  inn: string;
};
export type FormComponentPros = {
  children: ReactElement | ReactElement[];
  submit: () => void;
  initialValues: Record<string, unknown>;
  validationSchema: any;
};
const Form: FC<FormComponentPros> = ({
  children,
  submit,
  initialValues,
  validationSchema,
}) => {
  const formik = useFormik({
    initialValues: {
      ...initialValues,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });

  return (
    <form className={styles.form} onSubmit={formik.handleSubmit}>
      {Children.map(children, (child) => {
        return cloneElement(child, {
          form: formik,
        });
      })}
    </form>
  );
};

export default Form;
