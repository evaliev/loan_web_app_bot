export enum PageStatuses {
  LOGIN_PAGE = 'LOGIN_PAGE',
  TERM_PAGE = 'TERM_PAGE',
  DATA_PAGE = 'DATA_PAGE',
  INDI_DATA_PAGE = 'INDI_DATA_PAGE',
  SUCCESS_PAGE = 'SUCCESS_PAGE',
  OWNER_DATA = 'OWNER_DATA',
}

type Params = {
  text?: string;
  color?: string;
  text_color?: string;
  is_active?: boolean;
  is_visible?: boolean;
};

export type TelegramBtnsProps = {
  mainBtnTitle?: string;
  hasBackBtn?: boolean;
  mainBtnHandler?: VoidFunction;
  backBtnHandler?: VoidFunction;
  params?: Params;
};
