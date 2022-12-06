import { useCallback, useContext, useState } from 'react';

import { IconButton, Dialog, DialogContent, DialogTitle } from '@mui/material';

import styles from './styles.module.scss';
import InputRange from '../../components/InputRange';
import { CloseIcon, DocsIcon } from '../../icons';
import { ContextApp } from '../../state/context';
import { ActionTypes } from '../../state/types';
import { useTelegramBtns } from '../../hooks';
import { PageStatuses } from '../types';
import { PaymentSchedule } from '../../components/PaymentSchedule';

export const TermPage = () => {
  const { state, dispatch } = useContext(ContextApp);
  const [open, setOpen] = useState(false);
  const handleOpen = () => {
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  useTelegramBtns({
    mainBtnTitle: 'Далее',
    mainBtnHandler: () => {
      dispatch({
        type: ActionTypes.CHANGE_STATUS,
        payload: PageStatuses.DATA_PAGE,
      });
    },
    hasBackBtn: true,
    backBtnHandler: () => {
      dispatch({
        type: ActionTypes.CHANGE_STATUS,
        payload: PageStatuses.LOGIN_PAGE,
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
        <DocsIcon width={87} height={70} />
        <p className={styles.title}>Экспресс-кредит для бизнеса</p>
        <p className={styles.subTitle}>Банк KEK (LOL)</p>
      </div>
      <div className={styles.inputs}>
        <InputRange
          value={state.amount}
          label="Сумма — до 5 млн ₽"
          withControls
          increaseHandler={increaseAmount}
          decreaseHandler={decreaseAmount}
          changeHandler={changeAmount}
        />
        <InputRange
          value={state.term}
          label="Срок — до 36 месяцев"
          withControls
          increaseHandler={increaseTerm}
          decreaseHandler={decreaseTerm}
          changeHandler={changeTerm}
        />
        <InputRange
          value={state.monthlyPayment}
          label="Ежемесячный платеж, ₽"
          withControls
          increaseHandler={increaseMonthlyPayment}
          decreaseHandler={decreaseMonthlyPayment}
          changeHandler={changeMonthlyPayment}
        />
      </div>
      <div className={styles.footer}>
        <p className={styles.title}>Ставка по кредиту от 11,5 %</p>
        <p className={styles.subTitle}>
          Предварительный <span onClick={handleOpen}>график платежей</span>
        </p>
      </div>
      <Dialog open={open} onClose={handleClose} scroll="body">
        <DialogTitle className={styles.dialogTitle} component={'div'}>
          <p>Предварительный график платежей</p>
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <PaymentSchedule state={state} />
        </DialogContent>
      </Dialog>
    </div>
  );
};
