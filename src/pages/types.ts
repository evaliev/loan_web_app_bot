export enum PageStatuses {
  LOGIN_PAGE = 'LOGIN_PAGE',
  TERM_PAGE = 'TERM_PAGE',
  DATA_PAGE = 'DATA_PAGE',
  LENT_DATA_PAGE = 'LENT_DATA_PAGE',
  SUCCESS_PAGE = 'SUCCESS_PAGE',
  OWNER_DATA = 'OWNER_DATA',
}

export type TelegramBtnsProps = {
  mainBtnTitle?: string;
  hasBackBtn?: boolean;
  mainBtnHandler?: VoidFunction;
  backBtnHandler?: VoidFunction;
};
