import moment from 'moment';

import { DATE_FORMAT } from '../constants';

import {
  PaymentItemList,
  PaymentScheduleParams,
  PaymentItem,
  FormattedPaymentItem,
} from './types';

export const formatAmountDisplay = (amount: number, fixed = 2): string => {
  return amount.toLocaleString('ru-RU', { maximumFractionDigits: fixed });
};

export const deformAmount = (amount: string) => {
  return amount.replace(/[^\d,]/g, '').replace(/[,]/g, '.');
};

const getMonthlyRate = (rate: number): number => rate / 12 / 100;

export const getTermByMonthlyPayment = (
  amount: number,
  monthlyPayment: number,
  rate = 11.5,
): number => {
  const monthlyRate = getMonthlyRate(rate);

  return Math.round(
    Math.log10(monthlyPayment / (monthlyPayment - monthlyRate * amount)) /
      Math.log10(monthlyRate + 1),
  );
};

export const getAmountByMonthlyPayment = (
  monthlyPayment: number,
  term: number,
  rate = 11.5,
): number => {
  const monthlyRate = getMonthlyRate(rate);

  const annuityRate =
    (monthlyRate * Math.pow(1 + monthlyRate, term)) /
    (Math.pow(1 + monthlyRate, term) - 1);

  const amount = monthlyPayment / annuityRate;

  return amount;
};

export const getMonthlyPaymentByTerm = (
  amount: number,
  term: number,
  rate = 11.5,
  round = false,
  fixed = 2,
): number => {
  const monthlyRate = getMonthlyRate(rate);

  const annuityRate =
    (monthlyRate * Math.pow(1 + monthlyRate, term)) /
    (Math.pow(1 + monthlyRate, term) - 1);

  const monthlyPayment = amount * annuityRate;

  return round
    ? Math.round(monthlyPayment)
    : Number(monthlyPayment.toFixed(fixed));
};

export const getFirstPaymentDate = (paymentDay = 1) => {
  return moment().date() < paymentDay
    ? moment().date(paymentDay)
    : moment().date(paymentDay).add(1, 'month');
};

export const annuityPaymentSchedule = ({
  amount,
  term,
  rate,
  paymentDay = 1,
}: PaymentScheduleParams): PaymentItemList => {
  const payments = [] as PaymentItemList;
  let interestPayment = 0; // Оплата процентов
  let loanBalance = 0; // Остаток погашения
  let debtPayment = 0; // Основной долг
  const monthlyRate = getMonthlyRate(rate);

  // Ежемесячный платёж без округления
  const monthlyPaymentNoRounded = getMonthlyPaymentByTerm(
    amount,
    term,
    rate,
    false,
  );

  // дата первого платежа по кредиту
  const firstPaymentDate = getFirstPaymentDate(paymentDay);

  for (let paymentNumber = 1; paymentNumber <= term; paymentNumber++) {
    if (paymentNumber === 1) {
      interestPayment = amount * monthlyRate;
      debtPayment = monthlyPaymentNoRounded - interestPayment;
      loanBalance = amount - debtPayment;
    } else if (paymentNumber >= 2) {
      interestPayment = loanBalance * monthlyRate;
      debtPayment = monthlyPaymentNoRounded - interestPayment;
      loanBalance = loanBalance - debtPayment;
    }

    payments.push({
      paymentNumber,
      interestPayment,
      debtPayment,
      loanBalance: loanBalance < 0.1 ? 0 : loanBalance,
      monthlyPayment: monthlyPaymentNoRounded,
      paymentDate: moment(firstPaymentDate)
        .add(paymentNumber - 1, 'month')
        .format(DATE_FORMAT),
    });
  }

  return payments;
};

export const convertToPaymentsTableData = (
  data: PaymentItemList,
): FormattedPaymentItem[] => {
  const renderFormattedData = (payment: PaymentItem) => {
    const formattedData: FormattedPaymentItem = {
      ...payment,
      paymentNumber: payment.paymentNumber,
      interestPayment: formatAmountDisplay(payment.interestPayment, 2),
      debtPayment: formatAmountDisplay(payment.debtPayment, 2),
      loanBalance: formatAmountDisplay(payment.loanBalance, 2),
      monthlyPayment: formatAmountDisplay(payment.monthlyPayment, 2),
    };

    return formattedData;
  };

  const paymentsList = data.map((item) => renderFormattedData(item));

  return paymentsList;
};
