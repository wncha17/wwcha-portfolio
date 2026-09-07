import { Route, Routes } from "react-router-dom"
import { Header } from "../widgets/header"
import Home from "../pages/HomePage/ui/Home"
import Projects from "../pages/ProjectPage/ui/Project"
import Algorithm from "../widgets/algorithm-list/ui/AlgorithmList"
import Problems from "../widgets/problems-list/ui/ProblemsList"

function App() {

  return (
    <>
      <Header />

      <Routes>
        <Route path='/' element={<Home />}/>
        <Route path='/projects' element={<Projects />}/>
        <Route path='/algorithm' element={<Algorithm />}/>
        <Route path="/problems" element={<Problems />} />
      </Routes>
    </>
  )
}

export default App
