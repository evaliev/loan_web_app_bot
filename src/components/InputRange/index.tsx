import { ChangeEventHandler, memo, useState } from 'react';
import cc from 'classnames';

import { MinusIcon, PlusIcon } from '../../icons';
import styles from './styles.module.scss';

type InputRangeProps = {
  value: number | null;
  label: string;
  withControls?: boolean;
  increaseHandler?: VoidFunction;
  decreaseHandler?: VoidFunction;
  changeHandler: (value: number) => void;
};

const InputRange = ({
  value,
  label,
  withControls = false,
  increaseHandler,
  decreaseHandler,
  changeHandler,
}: InputRangeProps) => {
  const [isFocused, setIsFocused] = useState(false);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    changeHandler(Number(e.target.value));
  };

  return (
    <div>
      <div
        className={cc(styles.container, isFocused && styles.container_focused)}
      >
        <input
          onChange={onChange}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
          type="number"
          value={value || undefined}
        />
        {withControls && (
          <div className={styles.buttons}>
            <button className={styles.button} onClick={increaseHandler}>
              <PlusIcon />
            </button>
            <div className={styles.separator} />
            <button className={styles.button} onClick={decreaseHandler}>
              <MinusIcon />
            </button>
          </div>
        )}
      </div>
      <span className={styles.label}>{label}</span>
    </div>
  );
};

export default memo(InputRange);
