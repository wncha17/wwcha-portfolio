import { Link, Route, Routes } from "react-router-dom"
import styles from './App.module.css'
import About from "../pages/About/About"
import Skills from "../pages/Skills/Skills"
import Projects from "../pages/Projects/Projects"
import Algorithm from "../pages/Algorithm"

function App() {

  return (
    <>
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

      <Routes>
        <Route
          path='/'
          element={
            <>
              <About/>
              <Skills />
            </>
          }
        />
        <Route path='/projects' element={<Projects />}/>
        <Route path='/algorithm' element={<Algorithm />}/>
      </Routes>
    </>
  )
}

export default App
