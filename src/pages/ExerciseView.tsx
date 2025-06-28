import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { AuthContext } from "../providers/AuthProvider";
import "./ExerciseView.css";
import useSets, { addSetToDatabase } from "../data-handlers/setHandler";
import { Header } from "../navigation/Header";
import Set from "../classes/Set";
import { deleteExerciseFromDatabase, submitNameToDatabase } from "../data-handlers/exerciseHandler";
import type { User } from "firebase/auth";

import { ImCheckmark } from "react-icons/im";


type SetCardProps = {
    set: Set;
}


function SetCard({set} : SetCardProps) {
    return (
        <div className="card">
            {/* {set.getId()} */}
            <input type="text" />
            <input type="text" />
            <input type="text" />
            <button className="checkMark"><ImCheckmark size={"3vh"}/></button>
        </div>
    )
}


const ExerciseView = () => {

    const auth = useContext(AuthContext);
    const exerciseId = useParams()["exerciseId"]; // Ta från länk
    const [activeTab, setActiveTab] = useState('sets');
    const navigate = useNavigate();

    const location = useLocation();
    const exerciseName: string = location.state["exerciseName"];

    const inputRef = useRef<HTMLInputElement>(null);

    const { sets, getSets } = useSets(exerciseId!);

    const [deletePressed, setDeletePressed] = useState(false);

    useEffect(() => {  
        if (!auth || !auth.curUser) navigate("/");

    })    
    
    async function addSet(exerciseId: string): Promise<void> {
        await addSetToDatabase(auth!.curUser!, exerciseId);
        getSets();
    }

    async function deleteExercise(user: User, exerciseId: string, emailConfirmation: string) {//, updateExercises: () => void) {
        if (emailConfirmation == auth?.curUser?.email) {
            await deleteExerciseFromDatabase(user, exerciseId);
            navigate("/");
        }
        // updateExercises();
    }

    async function changeExerciseName() {
        const newName: string = inputRef.current!.value;
        submitNameToDatabase(auth?.curUser!, exerciseId!, newName);
    }


    return (
        <>
            <Header/>

            <div className="tabs">
                <button className={activeTab === 'sets' ? 'active' : 'inactive'} 
                        onClick={() => setActiveTab("sets")}>Sets
                </button>
                <button className={activeTab === 'details' ? 'active' : 'inactive'} 
                        onClick={() => setActiveTab('details')}>Details
                </button>
            </div>

            {activeTab === 'sets' &&        

            <div className="setList">

                {sets.map((set: Set) => (               
                    <SetCard key={set.getId()} set={set}/>
                ))}  

                <button onClick={ () => addSet(exerciseId!) }>
                    Add Set
                </button>
            </div>
            }

            {activeTab === 'details' && 
            <div className="details">
                <div className="inputs">
                    <input type="text" defaultValue={exerciseName} ref={inputRef}/>
                    <input type="submit" value="Submit" onClick={changeExerciseName}/>
                </div>
                
                {deletePressed ?                
                <input type="text" onChange={(e) => deleteExercise(auth?.curUser!, exerciseId!, e.target.value)} placeholder="Enter your email to delete the exercise."/>
                :
                // <button id="deleteExercise" onClick={() => deleteExercise(auth?.curUser!, exerciseId!)}>
                <button id="deleteExercise" onClick={() => setDeletePressed(true)}>
                    Delete Exercise
                </button>
                }
            </div>
            }       
        </>
    )
}

export default ExerciseView