import { useCallback, useContext } from 'react';
import { SmartCaptcha } from '@yandex/smart-captcha';

import styles from './styles.module.scss';
import InputRange from '../../components/InputRange';
import { useTelegramBtns } from '../../hooks';
import { DocsIcon } from '../../icons';
import { ContextApp } from '../../state/context';
import { ActionTypes } from '../../state/types';
import { telegram } from '../../telegram';
import { PageStatuses } from '../types';

export const LoginPage = () => {
  const { state, dispatch } = useContext(ContextApp);

  useTelegramBtns({
    mainBtnTitle: 'Войти',
    mainBtnHandler: () => {
      dispatch({
        type: ActionTypes.CHANGE_STATUS,
        payload: PageStatuses.TERM_PAGE,
      });
    },
    hasBackBtn: true,
    backBtnHandler: () => {
      telegram.close();
    },
  });

  const changeINN = useCallback(
    (value: number) => {
      dispatch({ type: ActionTypes.CHANGE_INN, payload: value });
    },
    [dispatch],
  );

  return (
    <>
      <div className={styles.header}>
        <DocsIcon width={87} height={70} />
        <p className={styles.title}>Экспресс-кредит для бизнеса</p>
        <p className={styles.subTitle}>Банк KEK (LOL)</p>
      </div>
      <div className={styles.auth_input}>
        <InputRange
          value={state.INN}
          min={0}
          max={Infinity}
          label="Введите ИНН организации"
          changeHandler={changeINN}
        />
      </div>
      <SmartCaptcha sitekey={''} />
    </>
  );
};
