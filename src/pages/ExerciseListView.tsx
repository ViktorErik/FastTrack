import { useContext, useEffect, useRef, useState } from "react"
import { AuthContext } from "../providers/AuthProvider"
import { useNavigate } from "react-router";
import useExercises, { addExerciseToDatabase, submitNameToDatabase } from "../data-handlers/exerciseHandler";
import "./ExerciseListView.css";

import Exercise from "../classes/Exercise";
import type { User } from "firebase/auth";




/*
async function deleteExercise(user: User, exercise: Exercise, updateExercises: () => void) {
    await deleteExerciseFromDatabase(user, exercise);
    updateExercises();
}
    */

type ExerciseCardProps = {
    
    exercise: Exercise;
    user: User;
    
};



function ExerciseCard({ exercise, user }: ExerciseCardProps) {

    const inputRef = useRef<HTMLInputElement>(null);
    const [, setSubmittedState] = useState(exercise.getSubmitted());
    const navigate = useNavigate();

    function submitName() {
        const name: string = inputRef.current!.value;
        exercise.setSubmitted(true);
        exercise.setName(name);
        submitNameToDatabase(user, exercise.getId(), name);     
        setSubmittedState(true);
    }

    return (
        <button className="card" onClick={
            exercise.getSubmitted() ? () => navigate(exercise.getId(), {state: {exerciseName: exercise.getName()}}) :
            void(0)
        }>                        
            {exercise.getSubmitted() ? 
            // <Link to={exercise.getId()}>{exercise.getName()}</Link> 
            exercise.getName()
            :
            <>
                <input type="text" placeholder="Enter Name of Exercise" defaultValue={exercise.getName()} ref={inputRef}/>
                <input type="submit" value="Submit" onClick={submitName}/>
            </>
            }
           

        </button>
    )
}


export const ExerciseListView = () => {    
    

    const { exercises, getExercises } = useExercises();
    
    const auth = useContext(AuthContext);

    useEffect(() => {  
        if (!auth || !auth.curUser)  {// navigate("/FastTrack");        
        }
    })    

    async function addExercise(): Promise<void> {
        for (let exercise of exercises) {
            if (!exercise.getSubmitted()) {
                return;
            }
        }
        await addExerciseToDatabase(auth!.curUser!);
        getExercises();
    }

    return (
        <div className="exerciseList">

            {auth?.curUser ? exercises.map((exercise: Exercise) => (               
                <ExerciseCard key={exercise.getId()} exercise={exercise} user={auth.curUser!} />
            ))
            : <div>Sign in to view your exercises.</div>}     
        
            {auth?.curUser ?
            <button onClick={ addExercise }>
                Add Exercise 
            </button>
            : ""}
        </div>
    )
}

export default ExerciseListView


