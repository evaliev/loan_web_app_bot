import { FC } from 'react';

import styles from './styles.module.scss';

import { State } from '../../state/types';
import {
  convertToPaymentsTableData,
  annuityPaymentSchedule,
} from '../../utils';

type Props = {
  state: State;
};

export const PaymentSchedule: FC<Props> = ({ state }) => {
  const { amount, term } = state;
  const paymentSchedule = convertToPaymentsTableData(
    annuityPaymentSchedule({
      amount,
      term,
      rate: 11.5,
    }),
  );
  return (
    <>
      {paymentSchedule.map((payment) => (
        <div key={payment.paymentNumber} className={styles.scheduleRow}>
          <div>
            <span className={styles.paymentNumber}>
              {payment.paymentNumber}
            </span>
            <span className={styles.paymentDate}>{payment.paymentDate}</span>
          </div>
          <div>
            <div>
              <div className={styles.title}>Сумма платежа</div>
              <div className={styles.value}>{payment.monthlyPayment} ₽</div>
            </div>
            <div>
              <div className={styles.title}>Остаток долга</div>
              <div className={styles.value}>{payment.loanBalance} ₽</div>
            </div>
          </div>
        </div>
      ))}
    </>
  );
};
