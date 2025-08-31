import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";
import Exercise from "../classes/Exercise";
import type { User } from "firebase/auth";




export const addExerciseToDatabase = async (user: User): Promise<void> => {    

    const docRef = await addDoc(collection(db, "users", user.uid, "exercises"), {});
    const exercisesRef = await getDocs(collection(db, "users", user.uid, "exercises"));

    let maxOrder: number = exercisesRef.size;
    

    await setDoc(doc(db, "users", user.uid, "exercises", docRef.id), {    
        id: docRef.id,
        submitted: false,
        orderNumber: maxOrder + 1,
    });    
}


export const deleteExerciseFromDatabase = async (user: User, exerciseId: string): Promise<void> => {
    
    // Delete sets in exercise
    const setRefs = await getDocs(collection(db, "users", user.uid, "exercises", exerciseId, "sets"));   
    setRefs.forEach(async (set) => {
        await deleteDoc(doc(db, "users", user.uid, "exercises", exerciseId, "sets", set.id));    
    });


    // Delete exercise itself
    await deleteDoc(doc(db, "users", user.uid, "exercises", exerciseId));
    
}

export const submitNameToDatabase = async (user: User, exerciseId: string, name: string): Promise<void> => {
    await updateDoc(doc(db, "users", user.uid, "exercises", exerciseId), {   
        name: name,
        submitted: true,
    });  
}

export const submitDescriptionToDatabase = async (user: User, exerciseId: string, description: string): Promise<void> => {
    await updateDoc(doc(db, "users", user.uid, "exercises", exerciseId), {
        description: description,
    });
}

export const getDescription = async (user: User, exerciseId: string): Promise<string> => {
    
    const docRef = await getDoc(doc(db, "users", user.uid, "exercises", exerciseId));
    if (docRef) {
        const description = docRef.data()!["description"]
        return description
    }
    else {
        return "";
    }
    
    
}

const sortExercises = (exercises: Exercise[]) => {
    
    for (let i = 0; i < exercises.length; i++) {
        for (let j = i+1; j < exercises.length; j++) {
            if (exercises[j].getOrderNumber() < exercises[i].getOrderNumber()) {
                let temp = exercises[i];
                exercises[i] = exercises[j];
                exercises[j] = temp;
            }
        }
    }
    return exercises;
}

const useExercises = () => {
    const auth = useContext(AuthContext);
    // const [user, setUser] = useState<User | null>(null);
    const [exercises, setExercises] = useState<Exercise[]>([]);
    

    async function getExercises() {
        const userExercises = await getDocs(collection(db, "users", auth!.curUser!.uid, "exercises"));   

        let exercises: Array<Exercise> = [];
        userExercises.forEach((exercise) => {
            const exerciseData = exercise.data();       
                 
            exercises.push(new Exercise(exerciseData["id"], exerciseData["name"], exerciseData["muscles"], exerciseData["submitted"], undefined, exerciseData["orderNumber"]));                           
        });       
        exercises = sortExercises(exercises);        
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
