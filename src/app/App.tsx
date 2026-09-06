import { Link, Route, Routes } from "react-router-dom"
import styles from './App.module.css'
import About from "../pages/About/About"
import Skills from "../pages/Skills/Skills"
import Archive from "../pages/Archive/Archive"
import Projects from "../pages/Projects/Projects"
import Algorithm from "../pages/Algorithm/Algorithm"
import Problems from "../pages/Algorithm/Problems/Problems"

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
              <Archive />
            </>
          }
        />
        <Route path='/projects' element={<Projects />}/>
        <Route path='/algorithm' element={<Algorithm />}/>
        <Route path="/problems" element={<Problems />} />
      </Routes>
    </>
  )
}

export default App
