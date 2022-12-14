import { useContext, useMemo } from 'react';

import styles from './styles.module.scss';
import { DetailLine } from '../../components/DetailLine';
import { DocsIcon, ArrowIcon } from '../../icons';
import { useTransport, useTelegramBtns } from '../../hooks';
import { ActionTypes } from '../../state/types';
import { PageStatuses } from '../types';
import { ContextApp } from '../../state/context';
import { formatAmountDisplay, getIsAllValuesFilled } from '../../utils';
import transport from '../../transport';

export const DataPage = () => {
  const { state, dispatch } = useContext(ContextApp);

  const indiInfoFilled = useMemo(
    () => getIsAllValuesFilled(state.indiInfo),
    [state.indiInfo],
  );
  const ownerInfoFilled = useMemo(
    () => getIsAllValuesFilled(state.ownerInfo),
    [state.ownerInfo],
  );

  useTelegramBtns(
    {
      mainBtnTitle: 'Отправить заявку',
      mainBtnHandler: () => {
        initSubmitRequest();
      },
      hasBackBtn: true,
      backBtnHandler: () => {
        initGoBackRequest();
      },
      params: {
        is_visible: indiInfoFilled && ownerInfoFilled,
      },
    },
    [indiInfoFilled, ownerInfoFilled],
  );

  const initSubmitRequest = useTransport(async () => {
    const application = await transport.submitApplication(state.applicationId);

    dispatch({
      type: ActionTypes.SET_APPLICATION_DATA,
      payload: application,
    });
  });

  const initGoBackRequest = useTransport(async () => {
    const application = await transport.changeApplicationStatus(
      state.applicationId,
      PageStatuses.TERM_PAGE,
    );

    dispatch({
      type: ActionTypes.SET_APPLICATION_DATA,
      payload: application,
    });
  });

  const hadleClickOwnerData = useTransport(async () => {
    const application = await transport.changeApplicationStatus(
      state.applicationId,
      PageStatuses.OWNER_DATA,
    );

    dispatch({
      type: ActionTypes.SET_APPLICATION_DATA,
      payload: application,
    });
  });

  const hadleClickIndiData = useTransport(async () => {
    const application = await transport.changeApplicationStatus(
      state.applicationId,
      PageStatuses.INDI_DATA_PAGE,
    );

    dispatch({
      type: ActionTypes.SET_APPLICATION_DATA,
      payload: application,
    });
  });

  return (
    <>
      <div className={styles.card}>
        <div className={styles.cardHeader}>
          <div className={styles.iconContainer}>
            <DocsIcon />
          </div>
          <div className={styles.titlesContainer}>
            <span className={styles.cardTitle}>
              Экспресс-кредит для бизнеса
            </span>
            <span className={styles.cardSubtitle}>Банк KEK (LOL)</span>
          </div>
        </div>
        <div className={styles.detailsList}>
          <DetailLine
            label={
              <span className={styles.detailsListHeader}>
                Параметры кредита
              </span>
            }
            value={
              <span
                className={styles.detailsListHeaderValue}
                onClick={initGoBackRequest}
              >
                Изменить
              </span>
            }
          />
          <DetailLine
            label={'Сумма'}
            value={`${formatAmountDisplay(state.conditions.amount)} ₽`}
          />
          <DetailLine label={'Срок'} value={`${state.conditions.term} мес`} />
          <DetailLine
            label={'Ежемесячный платеж'}
            value={`${formatAmountDisplay(state.conditions.monthlyPayment)} ₽`}
          />
          <DetailLine label={'Ставка'} value={'11,5 %'} />
        </div>
      </div>
      <div className={styles.buttonGroup}>
        <button className={styles.dataButton} onClick={hadleClickIndiData}>
          Данные ИП
          <ArrowIcon />
        </button>
        <button className={styles.dataButton} onClick={hadleClickOwnerData}>
          Данные собственника
          <ArrowIcon />
        </button>
      </div>

      {/* DebugBar */}
      {process.env.NODE_ENV === 'development' && (
        <>
          <button
            style={{
              position: 'fixed',
              bottom: 0,
              right: 0,
              width: 200,
              height: 50,
            }}
            onClick={initSubmitRequest}
          >
            Отправить заявку
          </button>
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
        </>
      )}
    </>
  );
};
