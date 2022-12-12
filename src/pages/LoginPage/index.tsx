import { useCallback, useContext, useEffect, useState } from 'react';
import { SmartCaptcha } from '@yandex/smart-captcha';

import styles from './styles.module.scss';
import InputRange from '../../components/InputRange';
import { useTelegramBtns } from '../../hooks';
import { DocsIcon } from '../../icons';
import { ContextApp } from '../../state/context';
import { ActionTypes } from '../../state/types';
import { telegram } from '../../telegram';
import { PageStatuses } from '../types';
import { INN_LENGTH } from '../../constants';

export const LoginPage = () => {
  const { state, dispatch } = useContext(ContextApp);
  const [isValid, setIsValid] = useState(false);

  useTelegramBtns(
    {
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
      params: {
        is_visible: isValid,
      },
    },
    [isValid],
  );

  const changeINN = useCallback(
    (value: number) => {
      dispatch({ type: ActionTypes.CHANGE_INN, payload: value });
      if (String(value).length === INN_LENGTH) {
        setIsValid(true);
        return;
      }
      setIsValid(false);
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
          maxLength={INN_LENGTH}
          label="Введите ИНН организации (12 символов)"
          changeOnBlur={false}
          changeHandler={changeINN}
        />
      </div>
      {isValid && <SmartCaptcha sitekey={''} />}
    </>
  );
};
