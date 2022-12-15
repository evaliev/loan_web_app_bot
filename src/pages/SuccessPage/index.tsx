import { useContext } from 'react';

import { useTelegramBtns, useTransport } from '../../hooks';
import { telegram } from '../../telegram';
import { CheckCircleIcon } from '../../icons';
import styles from './styles.module.scss';
import transport from '../../transport';
import { ContextApp } from '../../state/context';
import { PageStatuses } from '../types';
import { ActionTypes } from '../../state/types';

export const SuccessPage = () => {
  const { state, dispatch } = useContext(ContextApp);

  //TODO временная возможность вернуться к заявке
  const initGoBackRequest = useTransport(async () => {
    const application = await transport.changeApplicationStatus(
      state.applicationId,
      PageStatuses.DATA_PAGE,
    );

    dispatch({
      type: ActionTypes.SET_APPLICATION_DATA,
      payload: application,
    });
  });

  useTelegramBtns({
    mainBtnTitle: 'Вернуться в чат',
    mainBtnHandler: () => {
      telegram.close();
    },
    hasBackBtn: true,
    backBtnHandler: initGoBackRequest,
  });

  return (
    <div className={styles.container}>
      <CheckCircleIcon />
      <p className={styles.title}>Ваша заявка отправлена</p>
      <p className={styles.subtitle}>
        Вы успешно отправили заявку на экспресс-кредит!
      </p>
      <p className={styles.subtitle}>
        Решение мы пришлем в чат-бот в течение 5 минут.
      </p>

      {/* DebugBar */}
      {process.env.NODE_ENV === 'development' && (
        <button
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: 200,
            height: 50,
          }}
          onClick={initGoBackRequest}
        >
          go_back
        </button>
      )}
    </div>
  );
};
