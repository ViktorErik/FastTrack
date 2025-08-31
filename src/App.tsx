// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'
// import './index.css'
// import { BrowserRouter, Route, Routes } from 'react-router'
import { HashRouter, Route, Routes } from 'react-router'
import HomeView from './pages/HomeView';
import { AuthProvider } from './providers/AuthProvider';
import ExerciseView from './pages/ExerciseView';
import { NewSetProvider } from './providers/NewSetProvider';


function App() {
    
  return (
    <>
      <AuthProvider>
      <NewSetProvider>

        {/* <BrowserRouter> */}
          <HashRouter>

            <Routes>
              <Route path='/' element={<HomeView/>}/>
              {/* <Route path='/FastTrack/ExerciseListView' element={<ExerciseListView/>}/> // /FastTrack/....   */}
              
              <Route path="/:exerciseId" element={<ExerciseView />} /> // /FastTrack/....              
              {/* <Route path="*" element={<SignInView/>}/> */}
              
            </Routes>
          </HashRouter>
          
        {/* </BrowserRouter> */}
      </NewSetProvider>
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



