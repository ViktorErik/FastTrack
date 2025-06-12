import { addDoc, collection, doc, getDocs, setDoc } from "firebase/firestore";
import { db } from "../firebase/firebase";
import type { User } from "firebase/auth";
import Set from "../classes/Set";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../providers/AuthProvider";


export const addSetToDatabase = async (user: User, exerciseId: string): Promise<void> => {
    console.log(exerciseId);
    const docRef = await addDoc(collection(db, "users", user.uid, "exercises", exerciseId, "sets"), {});
    await setDoc(doc(db, "users", user.uid, "exercises", exerciseId, "sets", docRef.id), {    
        id: docRef.id,
        
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
            sets.push(new Set(setData["id"], setData["setNumber"], setData["weight"], setData["reps"]));                           
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