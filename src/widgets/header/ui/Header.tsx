import { Link } from 'react-router-dom'
import styles from './Header.module.css'

export default function Header() {
    return (
        <header className={styles.header}>
            <h2>wwcha's portfolio</h2>
            <nav className={styles.navRight}>
            <ul className={styles.menus}>
                <li><Link to='/' className={styles.menuItem}>Home</Link></li>
                <li><Link to='/projects' className={styles.menuItem}>Projects</Link></li>
                <li><Link to='/algorithm' className={styles.menuItem}>Algorithm</Link></li>
            </ul>
            </nav>

            <div className={styles.divider} />
        </header>
    )
}