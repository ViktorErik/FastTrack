import { useContext, useEffect } from "react"
import { AuthContext } from "../providers/AuthProvider"
import { Link, useNavigate } from "react-router";
import useExercises, { addExerciseToDatabase, deleteExerciseFromDatabase } from "../data-handlers/exerciseHandler";
import "./ExerciseListView.css";
import type { User } from "firebase/auth";
import type Exercise from "../classes/Exercise";
import { CiEdit } from "react-icons/ci";
import { MdOutlineDeleteForever } from "react-icons/md";
// import Drawer from '@mui/material/Drawer';





async function deleteExercise(user: User, exercise: Exercise, updateExercises: () => void) {
    await deleteExerciseFromDatabase(user, exercise);
    updateExercises();
}

type ExerciseCardProps = {
    user: User;
    exercise: Exercise;
    updateExercises: () => void;
};



function ExerciseCard({ user, exercise, updateExercises }: ExerciseCardProps) {

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
                <ExerciseCard key={exercise.getId()} user={auth!.curUser!} exercise={exercise} updateExercises={getExercises}/>
            ))}        
        
            <button onClick={ addExercise }>
                Add Exercise 
            </button>
        </div>

        

    )
}

export default ExerciseListView


