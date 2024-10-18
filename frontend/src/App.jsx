
// import './App.css'
import { Link, Route, Routes } from 'react-router-dom'
import Main from './Components/main'
import AskDoubt from './Components/AskDoubt'
import AllDoubtes from './Components/AllDoubtes'
import Upload from './Components/Upload'
import GetResources from './Components/GetResouces'
import Answer from './Components/Answer'
import Login from './Components/LoggingIn'
import RequireAuth from './Components/Auth'

function App() {

  return (
      <>
        
        <Routes>
          {/* <Link to="">Quiz</Link> */}
          {/* <a href="http://"></a> */}
          <Route path='/' element={<Main/>}/>
          <Route path={`/:loginn`}  element={<Login/>}/>
          <Route path={`/:register`} element={<Login/>}/>
         
          
          {/* <Route element={<RequireAuth allowedRoles={["Student"]}/>}> */}
            {/* <Route path='/result/:marks/:userId/:totalMarks/:QuizId' element={<Result/>}/> */}
            <Route path='/askDoubt' element={<AskDoubt/>}/>
            <Route path='/allDoubts' element={<AllDoubtes/>}/>
            <Route path='/resource' element={<GetResources/>}/>
            <Route path='/answer/:doubtId' element={<Answer/>}/>
        {/* </Route> */}
        {/* <Route elemen/t={<RequireAuth allowedRoles={["teacher"]}/>}> */}
            <Route path='/upload' element={<Upload/>}/>
        {/* </Route> */}

        </Routes>
      </>
  )
}

export default App
