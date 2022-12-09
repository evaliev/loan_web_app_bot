import { useEffect } from 'react';

import { TelegramBtnsProps } from '../pages/types';
import { telegram } from '../telegram';

export const useTelegramBtns = (
  {
    mainBtnTitle,
    hasBackBtn,
    mainBtnHandler,
    backBtnHandler,
    params,
  }: TelegramBtnsProps,
  deps: React.DependencyList = [],
) => {
  useEffect(() => {
    if (mainBtnTitle && mainBtnHandler) {
      telegram.MainButton.text = mainBtnTitle;
      telegram.MainButton.onClick(mainBtnHandler);
      telegram.MainButton.show();
    } else {
      telegram.MainButton.hide();
    }

    if (hasBackBtn && backBtnHandler) {
      telegram.BackButton.onClick(backBtnHandler);
      telegram.BackButton.show();
    } else {
      telegram.BackButton.hide();
    }

    if (params) {
      telegram.MainButton.setParams(params);
    }

    return () => {
      telegram.MainButton.offClick(mainBtnHandler);
      telegram.BackButton.offClick(backBtnHandler);
    };
  }, deps);
};
