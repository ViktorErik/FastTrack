
import { onAuthStateChanged, signInWithPopup, signOut, type User } from "firebase/auth";
import { useState, useEffect, createContext, type ReactNode } from "react";
import { auth, provider } from "../firebase/firebase";


provider.setCustomParameters({
  prompt: "select_account"
});

type AuthContextType = {
    curUser: User | null;
    signInUser: () => Promise<void>;
    signOutUser: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({children} : {children: ReactNode}) => {

    const [curUser, setCurUser] = useState<User | null>(null);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            console.log("onAuthStateChanged:", user);

        setCurUser(user);
        });

        return () => unsubscribe();
    }, [curUser]);

    
    const signInUser = async () => {
      // signOut(auth);
      await signInWithPopup(auth, provider);
      // await signInWithRedirect(auth, provider);
      // await getRedirectResult(auth, )
    }

    const signOutUser = async () => {
        console.log("HEJ");
        await signOut(auth);
    }

    return (
        <>
            <AuthContext.Provider value={{curUser, signInUser, signOutUser}}>     
                {children}           
            </AuthContext.Provider>                    
        </>
    )
}
