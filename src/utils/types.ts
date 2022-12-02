export type PaymentScheduleParams = {
  amount: number; // Сумма кредита
  term: number; // Количество платежей
  rate: number; // ставка по кредиту
  paymentDay?: number; // день платежа по кредиту
};

export type PaymentItem = {
  paymentNumber: number;
  interestPayment: number;
  debtPayment: number;
  loanBalance: number;
  monthlyPayment: number;
  paymentDate: string;
};

export type PaymentItemList = PaymentItem[];

export type FormattedPaymentItem = {
  paymentNumber: number;
  interestPayment: string;
  debtPayment: string;
  loanBalance: string;
  monthlyPayment: string;
  paymentDate: string;
};
