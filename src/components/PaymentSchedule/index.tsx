import { FC } from 'react';

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

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
    <TableContainer component={Paper} elevation={0}>
      <Table>
        <TableHead>
          <TableRow>
            {/* <TableCell>Номер платежа</TableCell> */}
            <TableCell align="left">Дата платежа</TableCell>
            <TableCell align="right">Общая сумма платежа</TableCell>
            {/* <TableCell align="right">Сумма основного долга</TableCell> */}
            {/* <TableCell align="right">Сумма процентов</TableCell> */}
            <TableCell align="right">Остаток основного долга</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {paymentSchedule.map((payment) => (
            <TableRow key={payment.paymentNumber}>
              {/* <TableCell>{payment.paymentNumber}</TableCell> */}
              <TableCell align="left">{payment.paymentDate}</TableCell>
              <TableCell align="right">{payment.monthlyPayment}</TableCell>
              {/* <TableCell align="right">{payment.debtPayment}</TableCell> */}
              {/* <TableCell align="right">{payment.interestPayment}</TableCell> */}
              <TableCell align="right">{payment.loanBalance}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
};
