export enum PageStatuses {
  LOGIN_PAGE = 'LOGIN_PAGE',
  TERM_PAGE = 'TERM_PAGE',
  DATA_PAGE = 'DATA_PAGE',
  SUCCESS_PAGE = 'SUCCESS_PAGE',
}

export type TelegramBtnsProps = {
  mainBtnTitle?: string;
  hasBackBtn?: boolean;
  mainBtnHandler?: VoidFunction;
  backBtnHandler?: VoidFunction;
};
