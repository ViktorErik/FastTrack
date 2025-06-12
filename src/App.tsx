// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import './index.css'
import { BrowserRouter, Route, Routes } from 'react-router'
import ExerciseListView from "./pages/ExerciseListView";
import SignInView from './pages/SignInView';
import { AuthProvider } from './providers/AuthProvider';
import ExerciseView from './pages/ExerciseView';


function App() {
    
  return (
    <>
      <AuthProvider>
        <BrowserRouter>

            <Routes>
              <Route path='/' element={<SignInView/>}/>
              <Route path='/ExerciseListView' element={<ExerciseListView/>}/>              
              <Route path="ExerciseListView/:exerciseId" element={<ExerciseView />} />

              
            </Routes>
          
        </BrowserRouter>
      </AuthProvider>  
      

    </>
  )
}
export default App
  /*
  const [count, setCount] = useState(0);

  useEffect(() => {
    console.log("HEJ");
  }, [count]);

  return (
    <div>
      {count}
      <button onClick={() => setCount(count+1)}>inkrementera</button>
    </div>
  )
  */
  
  /*
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.tsx</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}
*/



