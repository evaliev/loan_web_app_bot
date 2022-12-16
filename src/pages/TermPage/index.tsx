import { useCallback, useContext, useState } from 'react';
import { IconButton, Dialog, DialogTitle } from '@mui/material';

import styles from './styles.module.scss';
import InputRange from '../../components/InputRange';
import { CloseIcon, DocsIcon } from '../../icons';
import { ContextApp } from '../../state/context';
import { ActionTypes } from '../../state/types';
import { useTransport, useTelegramBtns } from '../../hooks';
import { PageStatuses } from '../types';
import { PaymentSchedule } from '../../components/PaymentSchedule';
import { getMonthlyPaymentByTerm } from '../../utils';
import transport from '../../transport';

export const TermPage = () => {
  const { state, dispatch } = useContext(ContextApp);
  const [openSchedule, setOpenSchedule] = useState(false);

  useTelegramBtns({
    mainBtnTitle: 'Далее',
    mainBtnHandler: () => {
      initSubmitRequest();
    },
    hasBackBtn: false,
  });

  const initSubmitRequest = useTransport(async () => {
    await transport.updateConditions(state.applicationId, state.conditions);

    const application = await transport.changeApplicationStatus(
      state.applicationId,
      PageStatuses.DATA_PAGE,
    );

    dispatch({
      type: ActionTypes.SET_APPLICATION_DATA,
      payload: application,
    });
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

  const handleOpenSchedule = () => {
    setOpenSchedule(true);
  };

  const handleCloseSchedule = () => {
    setOpenSchedule(false);
  };

  return (
    <div>
      <div className={styles.header}>
        <DocsIcon width={87} height={70} />
        <p className={styles.title}>Экспресс-кредит для бизнеса</p>
        <p className={styles.subTitle}>Банк KEK (LOL)</p>
      </div>
      <div className={styles.inputs}>
        <InputRange
          value={state.conditions.amount}
          min={100_000}
          max={10_000_000}
          formatAmount
          increaseStep={100_000}
          decreaseStep={100_000}
          label="Сумма — до 10 млн ₽"
          withControls
          changeHandler={changeAmount}
        />
        <InputRange
          value={state.conditions.term}
          min={12}
          max={36}
          increaseStep={1}
          decreaseStep={1}
          label="Срок — до 36 месяцев"
          withControls
          changeHandler={changeTerm}
        />
        <InputRange
          value={state.conditions.monthlyPayment}
          min={getMonthlyPaymentByTerm(state.conditions.amount, 36)}
          max={getMonthlyPaymentByTerm(state.conditions.amount, 1)}
          formatAmount
          increaseStep={
            getMonthlyPaymentByTerm(
              state.conditions.amount,
              state.conditions.term - 1,
            ) -
            getMonthlyPaymentByTerm(
              state.conditions.amount,
              state.conditions.term,
            )
          }
          decreaseStep={
            getMonthlyPaymentByTerm(
              state.conditions.amount,
              state.conditions.term,
            ) -
            getMonthlyPaymentByTerm(
              state.conditions.amount,
              state.conditions.term + 1,
            )
          }
          label="Ежемесячный платеж, ₽"
          withControls
          withoutInputChange
          changeHandler={changeMonthlyPayment}
        />
      </div>
      <div className={styles.footer}>
        <p className={styles.title}>Ставка по кредиту 11,5 %</p>
        <p className={styles.subTitle}>
          Предварительный{' '}
          <span onClick={handleOpenSchedule}>график платежей</span>
        </p>
      </div>
      <Dialog open={openSchedule} onClose={handleCloseSchedule} scroll="body">
        <DialogTitle className={styles.dialogTitle} component={'div'}>
          <p>Предварительный график платежей</p>
          <IconButton onClick={handleCloseSchedule}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <div className={styles.dialogContent}>
          <PaymentSchedule state={state} />
        </div>
      </Dialog>

      {/* DebugBar */}
      {process.env.NODE_ENV === 'development' && (
        <button
          style={{
            position: 'fixed',
            bottom: 0,
            right: 0,
            width: 200,
            height: 50,
          }}
          onClick={initSubmitRequest}
        >
          Далее
        </button>
      )}
    </div>
  );
};
