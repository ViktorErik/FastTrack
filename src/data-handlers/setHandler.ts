import { addDoc, collection, deleteDoc, doc, getDocs, setDoc, updateDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import type { User } from "firebase/auth";
import Set from "../classes/Set";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";


export const addSetToDatabase = async (user: User, exerciseId: string): Promise<void> => {
    const date = new Date();
    const docRef = await addDoc(collection(db, "users", user.uid, "exercises", exerciseId, "sets"), {});
    await setDoc(doc(db, "users", user.uid, "exercises", exerciseId, "sets", docRef.id), {    
        id: docRef.id,
        submitted: false, 
        year: date.getFullYear(),
        month: date.getMonth(),
        day: date.getDate(),
        hour: date.getHours(),
        minute: date.getMinutes(),

    });
}

export const deleteSetFromDatabase = async (user: User, exerciseId: string, setId: string): Promise<void> => {
    await deleteDoc(doc(db, "users", user.uid, "exercises", exerciseId, "sets", setId));    
}

export const submitSetToDatabase = async (user: User, exerciseId: string, set: Set) : Promise<void> => {
    await updateDoc(doc(db, "users", user.uid, "exercises", exerciseId, "sets", set.getId()), {   
        setNumber: set.getSetNumber(),
        weight: set.getWeight(),
        reps: set.getReps(),
        submitted: true,
        });  
}




const useSets = (exerciseId: string) => {
    const auth = useContext(AuthContext);
    // const [user, setUser] = useState<User | null>(null);
    const [ sets, setSets ] = useState<Set[]>([]);
    

    async function getSets() {
        const userSets = await getDocs(collection(db, "users", auth!.curUser!.uid, "exercises", exerciseId, "sets"));   

        const sets: Array<Set> = [];
        userSets.forEach((set) => {
            const setData = set.data();      
            const date: Date = new Date(Number(setData["year"]), Number(setData["month"]), Number(setData["day"]), Number(setData["hour"]), Number(setData["minute"]));      
            sets.push(new Set(setData["id"], setData["setNumber"], setData["weight"], setData["reps"], setData["submitted"], date));      
        
        });                        
        setSets(sets);     
        
    }

    useEffect(() => {
        if (auth?.curUser?.uid) {            
            getSets();            
            
        }
    }, [auth?.curUser?.uid])

    return {sets, getSets};
    
}
export default useSets;