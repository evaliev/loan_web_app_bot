import { useCallback, useContext, useEffect, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';

import styles from './styles.module.scss';
import InputRange from '../../components/InputRange';
import { useTransport, useTelegramBtns } from '../../hooks';
import { DocsIcon } from '../../icons';
import { ContextApp } from '../../state/context';
import { ActionTypes } from '../../state/types';
import { telegram } from '../../telegram';
import { INN_LENGTH } from '../../constants';
import transport from '../../transport';

export const LoginPage = () => {
  const { state, dispatch } = useContext(ContextApp);

  const [isInnValid, setIsInnValid] = useState(false);
  const [isReCaptchaValid, setIsReCaptchaValid] = useState(false);

  const [reCaptchaToken, setReCaptchaToken] = useState<string | null>(null);
  const captchaRef = useRef(null);

  useTelegramBtns(
    {
      mainBtnTitle: 'Войти',
      mainBtnHandler: () => {
        initLogInRequest();
      },
      hasBackBtn: true,
      backBtnHandler: () => {
        telegram.close();
      },
      params: {
        is_visible: isInnValid && isReCaptchaValid,
      },
    },
    [isInnValid, isReCaptchaValid],
  );

  useEffect(() => {
    const chatId =
      process.env.NODE_ENV === 'production'
        ? String(telegram.initDataUnsafe.user.id)
        : '001';

    dispatch({
      type: ActionTypes.SET_CHAT_ID,
      payload: chatId,
    });
  }, []);

  const initLogInRequest = useTransport(async () => {
    const application = await transport.logIn({
      INN: state.INN?.toString() || '',
      chatId: state.chatId,
      reCaptchaToken,
    });

    dispatch({
      type: ActionTypes.SET_APPLICATION_DATA,
      payload: application,
    });
  });

  const changeINN = useCallback(
    (value: number) => {
      dispatch({ type: ActionTypes.CHANGE_INN, payload: value });
      if (String(value).length === INN_LENGTH) {
        setIsInnValid(true);
        return;
      }
      setIsInnValid(false);
    },
    [dispatch],
  );

  const onChangeReCaptchaToken = (token: string | null) => {
    setReCaptchaToken(token);
    setIsReCaptchaValid(true);
  };

  const onExpiredReCaptchaToken = () => {
    setReCaptchaToken(null);
    setIsReCaptchaValid(false);
  };

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
      <div className={styles.captcha}>
        <ReCAPTCHA
          sitekey={process.env.REACT_APP_SITE_KEY!}
          ref={captchaRef}
          onChange={onChangeReCaptchaToken}
          onExpired={onExpiredReCaptchaToken}
          theme="light"
          size="normal"
          badge="inline"
        />
      </div>

      {/* DebugBar */}
      {process.env.NODE_ENV === 'development' && (
        <button
          style={{
            position: 'fixed',
            bottom: 0,
            right: 0,
            width: 200,
            height: 50,
          }}
          disabled={!(isInnValid && isReCaptchaValid)}
          onClick={initLogInRequest}
        >
          Войти
        </button>
      )}
    </>
  );
};
