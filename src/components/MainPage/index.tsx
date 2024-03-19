import styles from './styles.module.scss';
import { Link } from "react-router-dom";

export default function MainPage() {
  return (
    <div className={styles['main-page']}>
        <h1 className={styles['main-page__title']}>Главная страница</h1>
        <div className={styles['main-page__cards']}>
            <Link to='clients'>
            <button className={styles['main-page__cards-card']}>Клиенты</button>
            </Link>
            <Link to='diagrams'>
            <button className={styles['main-page__cards-card']}>Диаграммы</button>
            </Link>
        </div>
    </div>
  )
}
