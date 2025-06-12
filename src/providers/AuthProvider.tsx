
import { onAuthStateChanged, signInWithPopup, type User } from "firebase/auth";
import { useState, useEffect, createContext, type ReactNode } from "react";
import { auth, provider } from "../firebase/firebase";





type AuthContextType = {
    curUser: User | null;
    signIn: () => Promise<void>;
    test: () => void;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children} : {children: ReactNode}) => {

    const [curUser, setCurUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            console.log("onAuthStateChanged:", user);

        if (user) {
            setCurUser(user);
        } 
        });

        return () => unsubscribe();
    }, []);

    
    const signIn = async () => {
      // signOut(auth);
      await signInWithPopup(auth, provider);
      
    }
    const test = () => {
      console.log(curUser);
    }                 

    return (
        <>
            <AuthContext.Provider value={{curUser, signIn, test,}}>     
                {children}           
            </AuthContext.Provider>                    
        </>
    )
}
