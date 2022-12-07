import { ReactComponent as Card } from './Card.svg';
import styles from './styles.module.scss';
export const Loader = () => {
  return (
    <div className={styles.container}>
      <Card width={48} height={48} className={styles.bounce} />
      <div className={styles.shadow}></div>
    </div>
  );
};
