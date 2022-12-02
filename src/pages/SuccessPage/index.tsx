import { useTelegramBtns } from '../../hooks';
import { telegram } from '../../telegram';
import { CheckCircleIcon } from '../../icons';
import styles from './styles.module.scss';

export const SuccessPage = () => {
  useTelegramBtns({
    mainBtnTitle: 'Вернуться в чат',
    mainBtnHandler: () => {
      telegram.close();
    },
    hasBackBtn: false,
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
    </div>
  );
};
