import { addDoc, collection, deleteDoc, doc, getDocs, setDoc} from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Exercise from "../classes/Exercise";
import type { User } from "firebase/auth";




export const addExerciseToDatabase = async (user: User): Promise<void> => {    

    const docRef = await addDoc(collection(db, "users", user.uid, "exercises"), {});
    await setDoc(doc(db, "users", user.uid, "exercises", docRef.id), {    
        id: docRef.id,
        name: "Bench press",
    });    
}


export const deleteExerciseFromDatabase = async (user: User, exercise: Exercise): Promise<void> => {
    await deleteDoc(doc(db, "users", user.uid, "exercises", exercise.id));
}


const useExercises = () => {
    const auth = useContext(AuthContext);
    // const [user, setUser] = useState<User | null>(null);
    const [exercises, setExercises] = useState<Exercise[]>([]);
    

    async function getExercises() {
        const userExercises = await getDocs(collection(db, "users", auth!.curUser!.uid, "exercises"));   

        const exercises: Array<Exercise> = [];
        userExercises.forEach((exercise) => {
            const exerciseData = exercise.data();            
            exercises.push(new Exercise(exerciseData["id"], exerciseData["name"], exerciseData["muscles"]));                           
        });                        
        setExercises(exercises);     
        
    }

    useEffect(() => {
        if (auth?.curUser?.uid) {            
            getExercises();            
            
        }
    }, [auth?.curUser?.uid])

    return {exercises, getExercises};
    
}
export default useExercises;
