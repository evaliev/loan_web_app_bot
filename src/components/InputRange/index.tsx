import { memo } from 'react';

import { MinusIcon, PlusIcon } from '../../icons';
import styles from './styles.module.scss';

type InputRangeProps = {
  value: number;
  label: string;
  increaseHandler: VoidFunction;
  decreaseHandler: VoidFunction;
};

const InputRange = ({
  value,
  label,
  increaseHandler,
  decreaseHandler,
}: InputRangeProps) => {
  return (
    <div>
      <div className={styles.container}>
        <span>{value}</span>
        <div className={styles.buttons}>
          <button className={styles.button} onClick={increaseHandler}>
            <PlusIcon />
          </button>
          <div className={styles.separator} />
          <button className={styles.button} onClick={decreaseHandler}>
            <MinusIcon />
          </button>
        </div>
      </div>
      <span className={styles.label}>{label}</span>
    </div>
  );
};

export default memo(InputRange);
