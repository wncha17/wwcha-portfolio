// <a> 태그 대신 쓰는 라우터 전용 링크 컴포넌트
// a 태그는 브라우저가 페이지를 통째로 새로 불러오는데
// Link 태그는 URL만 바꾸고 필요한 컴포넌트만 다시 그려서
// react-query 캐시나 앱 상태가 유지된 채로 이동함
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
        </header>
    )
}