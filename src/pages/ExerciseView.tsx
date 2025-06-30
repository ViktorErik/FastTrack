import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { AuthContext } from "../providers/AuthProvider";
import "./ExerciseView.css";
import useSets, { addSetToDatabase, deleteSetFromDatabase, submitSetToDatabase } from "../data-handlers/setHandler";
import { Header } from "../navigation/Header";
import Set from "../classes/Set";
import { deleteExerciseFromDatabase, submitNameToDatabase } from "../data-handlers/exerciseHandler";
import type { User } from "firebase/auth";

// import { ImCheckmark } from "react-icons/im";


type SetCardProps = {
    set: Set;
    user: User;
    exerciseId: string;
    refreshSets: () => void;
}


function SetCard({ set, user, exerciseId, refreshSets } : SetCardProps) {
    // let date: Date = new Date();

    const setNumberRef = useRef<HTMLInputElement>(null);
    const weightRef = useRef<HTMLInputElement>(null);
    const repsRef = useRef<HTMLInputElement>(null);

    const [, setSubmitted] = useState(set.getSubmitted());

    async function submitSet() {
        const setNumber = setNumberRef.current!.value;
        const weight = weightRef.current!.value;
        const reps = repsRef.current!.value;
    

        await submitSetToDatabase(user, exerciseId, new Set(set.getId(), setNumber, weight, reps, true));
        setSubmitted(true);
        set.setSubmitted(true);
        set.setSetNumber(setNumber);
        set.setWeight(weight);
        set.setReps(reps);

    }

    async function deleteSet() {
        await deleteSetFromDatabase(user, exerciseId, set.getId());
        refreshSets();
        
    }

    return (
        <div className="card">
            {/* {set.getId()} */}
            {/* <b>{date.getHours()}:{date.getMinutes()} {date.getDate()}/{date.getMonth() + 1} - {date.getFullYear()}</b> */}

            {!set.getSubmitted() ?     
                <>
                    <input type="number" placeholder="Set #" ref={setNumberRef} />
                    <input type="number" placeholder="Weight" ref={weightRef}/>
                    <input type="number" placeholder="Reps" ref={repsRef}/>
                    <button onClick={submitSet}><p>Submit</p></button>
                </>            
                :
                <>
                    <sub> {set.getDate()?.getHours()}:{set.getDate()?.getMinutes()} {set.getDate()?.getDate()}/{set.getDate()?.getMonth()!+1} - {set.getDate()?.getFullYear()}</sub>
                    <p>Set #{set.getSetNumber()},</p>
                    <p>Weight: {set.getWeight()},</p>
                    <p>Reps: {set.getReps()}</p>
                </>
            }

            <button onClick={deleteSet}>Delete Set</button>
                    
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
        for (let set of sets) {
            if (!set.getSubmitted()) return;
        }
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
                    <SetCard key={set.getId()} set={set} exerciseId={exerciseId!} user={auth?.curUser!} refreshSets={getSets}/>
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