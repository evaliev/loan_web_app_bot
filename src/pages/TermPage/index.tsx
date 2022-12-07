import { useCallback, useContext, useState } from 'react';

import { IconButton, Dialog, DialogTitle } from '@mui/material';

import styles from './styles.module.scss';
import InputRange from '../../components/InputRange';
import { CloseIcon, DocsIcon } from '../../icons';
import { ContextApp } from '../../state/context';
import { ActionTypes } from '../../state/types';
import { useTelegramBtns } from '../../hooks';
import { PageStatuses } from '../types';
import { PaymentSchedule } from '../../components/PaymentSchedule';
import { getMonthlyPaymentByTerm } from '../../utils';

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

  const changeAmount = useCallback(
    (value: number) => {
      dispatch({ type: ActionTypes.AMOUNT_CHANGE, payload: value });
    },
    [dispatch],
  );

  const changeTerm = useCallback(
    (value: number) => {
      dispatch({ type: ActionTypes.TERM_CHANGE, payload: value });
    },
    [dispatch],
  );

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
          min={100_000}
          max={5_000_000}
          increaseStep={100_000}
          decreaseStep={100_000}
          label="Сумма — до 5 млн ₽"
          withControls
          changeHandler={changeAmount}
        />
        <InputRange
          value={state.term}
          min={1}
          max={36}
          increaseStep={1}
          decreaseStep={1}
          label="Срок — до 36 месяцев"
          withControls
          changeHandler={changeTerm}
        />
        <InputRange
          value={state.monthlyPayment}
          min={getMonthlyPaymentByTerm(state.amount, 36)}
          max={getMonthlyPaymentByTerm(state.amount, 1)}
          increaseStep={
            getMonthlyPaymentByTerm(state.amount, state.term + 1) -
            getMonthlyPaymentByTerm(state.amount, state.term)
          }
          decreaseStep={
            getMonthlyPaymentByTerm(state.amount, state.term) -
            getMonthlyPaymentByTerm(state.amount, state.term - 1)
          }
          label="Ежемесячный платеж, ₽"
          withControls
          withoutInputChange
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
        <div className={styles.dialogContent}>
          <PaymentSchedule state={state} />
        </div>
      </Dialog>
    </div>
  );
};
