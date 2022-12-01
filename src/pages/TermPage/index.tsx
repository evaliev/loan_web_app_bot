import { useCallback, useContext, useEffect, useState } from 'react';

import styles from './styles.module.scss';
import InputRange from '../../components/InputRange';
import { LogoIcon } from '../../icons';
import { ContextApp } from '../../state/context';
import { ActionTypes } from '../../state/types';
import { useTelegramBtns } from '../../hooks';
import { PageStatuses } from '../types';
import { Loader } from '../../components/Loader';

export const TermPage = () => {
  const { state, dispatch } = useContext(ContextApp);
  const [isSubmiting, setIsSubmiting] = useState(false);

  useTelegramBtns({
    mainBtnTitle: 'Далее',
    mainBtnHandler: () => {
      setIsSubmiting(true);
    },
  });

  useEffect(() => {
    if (!state.conditions.isFetched) {
      dispatch({
        type: ActionTypes.CHANGE_LOADING_CONDIONS_STATUS,
        payload: true,
      });

      fetch('http://localhost:8080/api/v1/user/conditions')
        .then((response) => {
          if (response.ok) {
            return response.json();
          }

          return Promise.reject();
        })
        .then((body) => {
          dispatch({ type: ActionTypes.SET_CONDITIONS, payload: body });
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          dispatch({
            type: ActionTypes.CHANGE_LOADING_CONDIONS_STATUS,
            payload: false,
          });
        });
    }
  }, [state.conditions.isFetched]);

  useEffect(() => {
    if (isSubmiting) {
      dispatch({
        type: ActionTypes.CHANGE_LOADING_CONDIONS_STATUS,
        payload: true,
      });

      fetch('http://localhost:8080/api/v1/user/conditions', {
        method: 'POST',
        body: JSON.stringify({
          amount: state.conditions.amount,
          term: state.conditions.term,
          monthlyPayment: state.conditions.monthlyPayment,
        }),
      })
        .then((response) => {
          if (response.ok) {
            dispatch({
              type: ActionTypes.CHANGE_STATUS,
              payload: PageStatuses.DATA_PAGE,
            });
          }

          return Promise.reject();
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => {
          dispatch({
            type: ActionTypes.CHANGE_LOADING_CONDIONS_STATUS,
            payload: false,
          });
        });
    }
  }, [isSubmiting]);

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

  if (state.conditions.isLoading) {
    return <Loader />;
  }

  return (
    <div>
      <div className={styles.header}>
        <LogoIcon />
        <p className={styles.title}>Экспресс-кредит для бизнеса</p>
        <p className={styles.subTitle}>Банк KEK (LOL)</p>
      </div>
      <div className={styles.inputs}>
        <InputRange
          value={state.conditions.amount}
          label="Сумма — до 5 млн ₽"
          increaseHandler={increaseAmount}
          decreaseHandler={decreaseAmount}
          changeHandler={changeAmount}
        />
        <InputRange
          value={state.conditions.term}
          label="Срок — до 36 месяцев"
          increaseHandler={increaseTerm}
          decreaseHandler={decreaseTerm}
          changeHandler={changeTerm}
        />
        <InputRange
          value={state.conditions.monthlyPayment}
          label="Ежемесячный платеж, ₽"
          increaseHandler={increaseMonthlyPayment}
          decreaseHandler={decreaseMonthlyPayment}
          changeHandler={changeMonthlyPayment}
        />
      </div>
      <div className={styles.footer}>
        <p className={styles.title}>
          Ставка по кредиту от {state.conditions.rate} %
        </p>
        <p className={styles.subTitle}>
          Предварительный <a href="">график платежей</a>
        </p>
      </div>
    </div>
  );
};
