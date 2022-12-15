import { useContext, useEffect, useState } from 'react';

import { TelegramBtnsProps } from '../pages/types';
import { ContextApp } from '../state/context';
import { ActionTypes } from '../state/types';
import { telegram } from '../telegram';
import { delay } from '../utils';

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

export const useTransport = (requestCallback: () => Promise<void>) => {
  const { dispatch } = useContext(ContextApp);

  const [isFetching, setIsFetching] = useState(false);

  useEffect(() => {
    if (isFetching) {
      dispatch({
        type: ActionTypes.SET_IS_LOADING,
        payload: true,
      });

      Promise.all([delay(), requestCallback()]).finally(() => {
        dispatch({
          type: ActionTypes.SET_IS_LOADING,
          payload: false,
        });
      });
    }
  }, [isFetching]);

  return () => {
    setIsFetching(true);
  };
};
