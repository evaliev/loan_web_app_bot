import { FC, ReactNode } from 'react';

import styles from './DetailLine.module.css';

type Props = {
  label: ReactNode;
  value: ReactNode;
};

export const DetailLine: FC<Props> = ({ label, value }) => {
  return (
    <div className={styles.container}>
      <span className={styles.label}>{label}</span>
      <span className={styles.value}>{value}</span>
    </div>
  );
};
