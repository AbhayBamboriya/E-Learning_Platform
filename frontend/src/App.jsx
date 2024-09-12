
// import './App.css'
import { Route, Routes } from 'react-router-dom'
import Main from './Components/main'
import AskDoubt from './Components/AskDoubt'
import AllDoubtes from './Components/AllDoubtes'
import Upload from './Components/Upload'
import GetResources from './Components/GetResouces'

function App() {

  return (
      <>
        
        <Routes>
          <Route path='/' element={<Main/>}/>
          <Route path='/askDoubt' element={<AskDoubt/>}/>
          <Route path='/allDoubts' element={<AllDoubtes/>}/>
          <Route path='/upload' element={<Upload/>}/>
          <Route path='resource' element={<GetResources/>}/>
        </Routes>
      </>
  )
}

export default App
