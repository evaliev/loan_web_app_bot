import { useCallback, useContext, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import { Alert, Snackbar } from '@mui/material';

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
        initRegistryRequest();
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

  const initRegistryRequest = useTransport(async () => {
    try {
      const application = await transport.registry({
        INN: state.INN?.toString() || '',
        chatId: state.chatId,
        reCaptchaToken,
      });

      dispatch({
        type: ActionTypes.SET_APPLICATION_DATA,
        payload: application,
      });
    } catch (_err) {
      const err = _err as Error;

      dispatch({
        type: ActionTypes.SET_NOTIFICATION,
        payload: { status: 'error', text: err.message },
      });
    }
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

  const handleCloseInnError = (
    _event?: React.SyntheticEvent | Event,
    reason?: string,
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    dispatch({
      type: ActionTypes.SET_NOTIFICATION,
      payload: null,
    });
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
      <Snackbar
        open={!!state.notification}
        autoHideDuration={3000}
        onClose={handleCloseInnError}
      >
        <Alert severity="error" sx={{ width: '100%' }}>
          {state?.notification?.text}
        </Alert>
      </Snackbar>

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
          onClick={initRegistryRequest}
        >
          Войти
        </button>
      )}
    </>
  );
};
