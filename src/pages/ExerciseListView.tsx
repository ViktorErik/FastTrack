import { useContext, useEffect } from "react"
import { AuthContext } from "../providers/AuthProvider"
import { Link, useNavigate } from "react-router";
import useExercises, { addExerciseToDatabase } from "../data-handlers/exerciseHandler";
import "./ExerciseListView.css";

import type Exercise from "../classes/Exercise";
// import Drawer from '@mui/material/Drawer';




/*
async function deleteExercise(user: User, exercise: Exercise, updateExercises: () => void) {
    await deleteExerciseFromDatabase(user, exercise);
    updateExercises();
}
    */

type ExerciseCardProps = {
    
    exercise: Exercise;
    
};



function ExerciseCard({ exercise }: ExerciseCardProps) {

    return (
        <div className="card">                        

            <Link to={exercise.getId()}>{exercise.getName()}</Link>


            {/* <button onClick={ () => deleteExercise(user, exercise, updateExercises) }>
                <MdOutlineDeleteForever/>
            </button>
            <button>
                <CiEdit/>
            <details>
                <summary/>
                <input type="text" placeholder={exercise.getName()}/>
                <input type="text" placeholder={exercise.getMuscles()}/>
                
            </details>            
                </button>             */}

        </div>
    )
}


export const ExerciseListView = () => {    
    
    const { exercises, getExercises } = useExercises();
    
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    useEffect(() => {  
        if (!auth || !auth.curUser) navigate("/");

    })    

    async function addExercise(): Promise<void> {
        await addExerciseToDatabase(auth!.curUser!);
        getExercises();
        // console.log(exercises);
    }

    return (
        <div className="exerciseList">            
            {exercises.map((exercise: Exercise) => (               
                <ExerciseCard key={exercise.getId()} exercise={exercise} />
            ))}        
        
            <button onClick={ addExercise }>
                Add Exercise 
            </button>
        </div>

        

    )
}

export default ExerciseListView


