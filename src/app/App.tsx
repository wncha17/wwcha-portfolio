import { Link, Route, Routes } from "react-router-dom"
import styles from './App.module.css'
import Portfolio from "../pages/Portfolio"
import Blog from "../pages/Blog"
import Algorithm from "../pages/Algorithm"

function App() {

  return (
    <>
      <header className={styles.header}>
        <h2>wwcha's portfolio</h2>
        <nav className={styles.navRight}>
          <ul className={styles.menus}>
            <li><Link to='/' className={styles.menuItem}>Portfolio</Link></li>
            <li><Link to='/blog' className={styles.menuItem}>Blog</Link></li>
            <li><Link to='/algorithm' className={styles.menuItem}>Algorithm</Link></li>
          </ul>
        </nav>

        <div className={styles.divider} />
      </header>

      <Routes>
        <Route path='/' element={<Portfolio />}/>
        <Route path='/blog' element={<Blog />}/>
        <Route path='/algorithm' element={<Algorithm />}/>
      </Routes>
    </>
  )
}

export default App
