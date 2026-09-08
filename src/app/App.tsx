import { Route, Routes } from "react-router-dom"
import { Header } from "../widgets/header"
import { Footer } from "../widgets/footer"
// FSD 원칙대로: App -> pages -> (page 내부에서) widgets를 부르는 흐름
import Home from "../pages/HomePage/ui/Home"
import Projects from "../pages/ProjectPage/ui/Project"
import Algorithm from "../pages/AlgorithmPage/ui/Algorithm"
import Problems from "../pages/ProblemsPage/ui/Problems"

function App() {

  return (
    <>
      {/* 공통 네비게이션 */}
      <Header />

      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/projects' element={<Projects />}/>
        <Route path='/algorithm' element={<Algorithm />}/>
        <Route path='/problems' element={<Problems />} />
      </Routes>

      <Footer />
    </>
  )
}

export default App
