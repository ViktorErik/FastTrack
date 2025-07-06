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
        second: date.getSeconds(),
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


function swap(sets: Set[], i: number, j: number) {
    let temp: Set = sets[i];
    sets[i] = sets[j];
    sets[j] = temp;
}

// Sort sets. Key is the date
const sortSets = (sets: Set[]): Set[] => {
    for (let i = 0; i < sets.length; i++) {
        for (let j = i; j < sets.length; j++) {

            if (
                sets[j].getDate()?.getFullYear()! < sets[i].getDate()?.getFullYear()!) swap(sets, i, j);

            else if (
                sets[j].getDate()?.getFullYear()! == sets[i].getDate()?.getFullYear()! &&
                sets[j].getDate()?.getMonth()! < sets[i].getDate()?.getMonth()!) swap(sets, i, j);

            else if (
                sets[j].getDate()?.getFullYear()! == sets[i].getDate()?.getFullYear()! && 
                sets[j].getDate()?.getMonth()! == sets[i].getDate()?.getMonth()! &&
                sets[j].getDate()?.getDate()! < sets[i].getDate()?.getDate()!) swap(sets, i, j);

            else if (
                sets[j].getDate()?.getFullYear()! == sets[i].getDate()?.getFullYear()! && 
                sets[j].getDate()?.getMonth()! == sets[i].getDate()?.getMonth()! &&
                sets[j].getDate()?.getDate()! == sets[i].getDate()?.getDate()! &&
                sets[j].getDate()?.getHours()! < sets[i].getDate()?.getHours()!) swap(sets, i, j);

            else if (
                sets[j].getDate()?.getFullYear()! == sets[i].getDate()?.getFullYear()! && 
                sets[j].getDate()?.getMonth()! == sets[i].getDate()?.getMonth()! &&
                sets[j].getDate()?.getDate()! == sets[i].getDate()?.getDate()! &&
                sets[j].getDate()?.getHours()! == sets[i].getDate()?.getHours()! && 
                sets[j].getDate()?.getMinutes()! < sets[i].getDate()?.getMinutes()!) swap(sets, i, j);
                       
            else if (
                sets[j].getDate()?.getFullYear()! == sets[i].getDate()?.getFullYear()! && 
                sets[j].getDate()?.getMonth()! == sets[i].getDate()?.getMonth()! &&
                sets[j].getDate()?.getDate()! == sets[i].getDate()?.getDate()! &&
                sets[j].getDate()?.getHours()! == sets[i].getDate()?.getHours()! && 
                sets[j].getDate()?.getMinutes()! == sets[i].getDate()?.getMinutes()! &&
                sets[j].getDate()?.getSeconds()! < sets[i].getDate()?.getSeconds()!) swap(sets, i, j);
        }
    }
    return sets;
}


const useSets = (exerciseId: string) => {
    const auth = useContext(AuthContext);
    // const [user, setUser] = useState<User | null>(null);
    const [ sets, setSets ] = useState<Set[]>([]);
    

    async function getSets() {
        const userSets = await getDocs(collection(db, "users", auth!.curUser!.uid, "exercises", exerciseId, "sets"));   

        let sets: Array<Set> = [];
        userSets.forEach((set) => {
            const setData = set.data();      
            // const date: Date = new Date(Number(setData["year"]), Number(setData["month"]), Number(setData["day"]), Number(setData["hour"]), Number(setData["minute"]), Number(setData["second"]));      
            const pad = (x: number): string => x.toString().padStart(2, "0");
            const date: Date = new Date(`\
${pad(setData["year"])}-\
${pad(setData["month"]+1)}-\
${pad(setData["day"])}T\
${pad(setData["hour"])}:\
${pad(setData["minute"])}:\
${pad(setData["second"])}\
`);
            sets.push(new Set(setData["id"], setData["setNumber"], setData["weight"], setData["reps"], setData["submitted"], date));      
        
        });               
        sets = sortSets(sets);         
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