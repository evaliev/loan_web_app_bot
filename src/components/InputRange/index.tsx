import {
  ChangeEventHandler,
  FocusEventHandler,
  KeyboardEventHandler,
  memo,
  useLayoutEffect,
  useState,
} from 'react';
import cc from 'classnames';

import { MinusIcon, PlusIcon } from '../../icons';
import styles from './styles.module.scss';

const invalidChars = ['e', 'E', '+', '-'];

type InputRangeProps = {
  value: number | null;
  min: number;
  max: number;
  maxLength?: number;
  increaseStep?: number;
  decreaseStep?: number;
  label: string;
  withControls?: boolean;
  withoutInputChange?: boolean;
  changeOnBlur?: boolean;
  changeHandler: (value: number) => void;
};

const InputRange = ({
  value,
  min,
  max,
  maxLength,
  increaseStep,
  decreaseStep,
  label,
  withControls = false,
  changeOnBlur = true,
  withoutInputChange = false,
  changeHandler,
}: InputRangeProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [controlledValue, setControlledValue] = useState(value);

  const onChange: ChangeEventHandler<HTMLInputElement> = (e) => {
    if (withoutInputChange) {
      return;
    }

    if (maxLength && e.target.value.length > maxLength) {
      return;
    }

    const newValue = Number(e.target.value);

    setControlledValue(newValue);

    if (!changeOnBlur) {
      changeHandler(newValue);
    }
  };

  const onFocus: FocusEventHandler<HTMLInputElement> = () => {
    setIsFocused(true);
  };

  const onBlur: FocusEventHandler<HTMLInputElement> = () => {
    setIsFocused(false);

    if (!changeOnBlur || !controlledValue) {
      return;
    }

    if (controlledValue >= min && controlledValue <= max) {
      changeHandler(controlledValue);
    }

    if (controlledValue < min) {
      changeHandler(min);
      setControlledValue(min);
    }

    if (controlledValue > max) {
      changeHandler(max);
      setControlledValue(max);
    }
  };

  const onKeyDown: KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (invalidChars.includes(e.key)) {
      e.preventDefault();
    }
  };

  const increaseHandler = () => {
    const newValue = (controlledValue || 0) + (increaseStep || 1);

    if (newValue >= min && newValue <= max) {
      changeHandler(newValue);
      setControlledValue(newValue);
    }
  };

  const decreaseHandler = () => {
    const newValue = (controlledValue || 0) - (decreaseStep || 1);

    if (newValue >= min && newValue <= max) {
      changeHandler(newValue);
      setControlledValue(newValue);
    }
  };

  useLayoutEffect(() => {
    setControlledValue(value);
  }, [value]);

  return (
    <div>
      <div
        className={cc(styles.container, isFocused && styles.container_focused)}
      >
        <input
          onChange={onChange}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={onKeyDown}
          type="number"
          value={controlledValue || ''}
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
