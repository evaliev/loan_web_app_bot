import { useCallback, useContext } from 'react';

import styles from './styles.module.scss';
import InputRange from '../../components/InputRange';
import { LogoIcon } from '../../icons';
import { ContextApp } from '../../state/context';
import { ActionTypes } from '../../state/types';
import { useTelegramBtns } from '../../hooks';
import { PageStatuses } from '../types';

export const TermPage = () => {
  const { state, dispatch } = useContext(ContextApp);

  useTelegramBtns({
    mainBtnTitle: 'Далее',
    mainBtnHandler: () => {
      dispatch({
        type: ActionTypes.CHANGE_STATUS,
        payload: PageStatuses.DATA_PAGE,
      });
    },
  });

  const increaseAmount = useCallback(() => {
    dispatch({ type: ActionTypes.AMOUNT_INCREASE });
  }, [dispatch]);

  const decreaseAmount = useCallback(() => {
    dispatch({ type: ActionTypes.AMOUNT_DECREASE });
  }, [dispatch]);

  const changeAmount = useCallback(
    (value: number) => {
      dispatch({ type: ActionTypes.AMOUNT_CHANGE, payload: value });
    },
    [dispatch],
  );

  const increaseTerm = useCallback(() => {
    dispatch({ type: ActionTypes.TERM_INCREASE });
  }, [dispatch]);

  const decreaseTerm = useCallback(() => {
    dispatch({ type: ActionTypes.TERM_DECREASE });
  }, [dispatch]);

  const changeTerm = useCallback(
    (value: number) => {
      dispatch({ type: ActionTypes.TERM_CHANGE, payload: value });
    },
    [dispatch],
  );

  const increaseMonthlyPayment = useCallback(() => {
    dispatch({ type: ActionTypes.MONTHLY_PAYMENT_INCREASE });
  }, [dispatch]);

  const decreaseMonthlyPayment = useCallback(() => {
    dispatch({ type: ActionTypes.MONTHLY_PAYMENT_DECREASE });
  }, [dispatch]);

  const changeMonthlyPayment = useCallback(
    (value: number) => {
      dispatch({ type: ActionTypes.MONTHLY_PAYMENT_CHANGE, payload: value });
    },
    [dispatch],
  );

  return (
    <div>
      <div className={styles.header}>
        <LogoIcon />
        <p className={styles.title}>Экспресс-кредит для бизнеса</p>
        <p className={styles.subTitle}>Банк KEK (LOL)</p>
      </div>
      <div className={styles.inputs}>
        <InputRange
          value={state.amount}
          label="Сумма — до 5 млн ₽"
          increaseHandler={increaseAmount}
          decreaseHandler={decreaseAmount}
          changeHandler={changeAmount}
        />
        <InputRange
          value={state.term}
          label="Срок — до 36 месяцев"
          increaseHandler={increaseTerm}
          decreaseHandler={decreaseTerm}
          changeHandler={changeTerm}
        />
        <InputRange
          value={state.monthlyPayment}
          label="Ежемесячный платеж, ₽"
          increaseHandler={increaseMonthlyPayment}
          decreaseHandler={decreaseMonthlyPayment}
          changeHandler={changeMonthlyPayment}
        />
      </div>
      <div className={styles.footer}>
        <p className={styles.title}>Ставка по кредиту от 11,5 %</p>
        <p className={styles.subTitle}>
          Предварительный <a href="">график платежей</a>
        </p>
      </div>
    </div>
  );
};
