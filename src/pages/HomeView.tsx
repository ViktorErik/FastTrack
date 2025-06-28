import { useState } from "react";
import "./HomeView.css";
import ExerciseListView from "./ExerciseListView";
import { CalculatorView } from "./CalculatorView";
import { Header } from "../navigation/Header";


export const HomeView = () => {


    const [activeTab, setActiveTab] = useState('exercises');


//      useEffect(() => {
//          if (auth?.curUser) navigate("/FastTrack/ExerciseListView");
//      }, [auth?.curUser])    
    
    
    return (
        <>                            
            
            <Header />

            <div className="tabs">
                <button className={activeTab === 'exercises' ? 'active' : 'inactive'} 
                        onClick={() => setActiveTab("exercises")}>Exercises
                </button>
                <button className={activeTab === 'calculator' ? 'active' : 'inactive'} 
                        onClick={() => setActiveTab('calculator')}>Max Calculator
                </button>
            </div>
            
            {activeTab === 'exercises' && <ExerciseListView />}            
            {activeTab === 'calculator' && <div><CalculatorView/></div>}
            
            {/* <Link to="/FastTrack/ExerciseListView">View Exercises</Link>   */}
        </>
    )
}

export default HomeView;