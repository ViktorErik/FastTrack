import { createContext, useContext, useState, type ReactNode } from "react";


type NewSetContextProps = {
    newSetState: boolean;
    setNewSetState: (arg: boolean) => void;
} 

const NewSetContext = createContext<NewSetContextProps | null>(null);

export function NewSetProvider( {children}: {children: ReactNode} ) {
    const [ newSetState, setNewSetState ] = useState(false);
    return (
        <NewSetContext.Provider value={{newSetState, setNewSetState}}>
            {children}
        </NewSetContext.Provider>
    )    
}

export function useNewSetState() {
  return useContext(NewSetContext)!;
}