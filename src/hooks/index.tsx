import { useEffect } from 'react';

import { TelegramBtnsProps } from '../pages/types';
import { telegram } from '../telegram';

export const useTelegramBtns = ({
  mainBtnTitle,
  hasBackBtn,
  mainBtnHandler,
  backBtnHandler,
}: TelegramBtnsProps) => {
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

    return () => {
      telegram.MainButton.offClick(mainBtnHandler);
      telegram.BackButton.offClick(backBtnHandler);
    };
  }, []);
};
