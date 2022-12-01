import React, { FC, ReactNode, useState } from 'react';

import styles from './Form.module.css';

export const FormContext = React.createContext({
  form: {},
});
export type LentInitialValues = {
  name: string;
  address: string;
  telephone: string;
  inn: string;
};
export type FormComponentPros = {
  children: ReactNode;
  submit: () => void;
  initialValues?: Record<string, unknown>;
};
const Form: FC<FormComponentPros> = ({ children, submit }) => {
  const [form, setForm] = useState({});

  const handleFormChange = (event: {
    target: { name: never; value: never };
  }) => {
    const { name, value } = event.target;

    setForm({
      ...form,
      [name]: value,
    });
  };

  return (
    <form className={styles.form}>
      <FormContext.Provider
        value={{
          form,
          // handleFormChange
        }}
      >
        {children}
      </FormContext.Provider>
    </form>
  );
};

export default Form;
