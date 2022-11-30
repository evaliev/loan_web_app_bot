export enum PageStatuses {
  TERM_PAGE = 'TERM_PAGE',
  DATA_PAGE = 'DATA_PAGE',
}

export type TelegramBtnsProps = {
  mainBtnTitle?: string;
  hasBackBtn?: boolean;
  mainBtnHandler?: VoidFunction;
  backBtnHandler?: VoidFunction;
};
