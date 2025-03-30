
// import './App.css'
import { Route, Routes } from 'react-router-dom'
import Home from './Components/HomePage'
import AskDoubt from './Components/AskDoubt'
import AllDoubtes from './Components/AllDoubtes'
import Upload from './Components/Upload'
import GetResources from './Components/GetResouces'
import Answer from './Components/Answer'

function App() {

  return (
      <>
        
        <Routes>
          <Route path='/' element={<Home/>}/>
          <Route path='/askDoubt' element={<AskDoubt/>}/>
          <Route path='/allDoubts' element={<AllDoubtes/>}/>
          <Route path='/upload' element={<Upload/>}/>
          <Route path='resource' element={<GetResources/>}/>
          <Route path='/answer/:doubtId' element={<Answer/>}/>
        </Routes>
      </>
  )
}

export default App
