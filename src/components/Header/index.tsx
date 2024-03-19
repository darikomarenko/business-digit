import styles from './styles.module.scss'
import {Link} from 'react-router-dom';

export default function Header() {
  return (
    <div className={styles['header']}>
      <Link to='/'> <div className={styles['header__text']}>Тестовое задание</div>
      </Link>
    </div>
  )
}
