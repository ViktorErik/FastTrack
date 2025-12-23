import { createContext, useContext, useState, type ReactNode } from "react";


type NewSetContextProps = {
    newSetState: boolean;
    setNewSetState: (arg: boolean) => void;
    newNoteState: boolean;
    setNewNoteState: (arg: boolean) => void;
} 

const NewSetContext = createContext<NewSetContextProps | null>(null);

export function NewSetProvider( {children}: {children: ReactNode} ) {
    const [ newSetState, setNewSetState ] = useState(false);
    const [ newNoteState, setNewNoteState ] = useState(false);
    return (
        <NewSetContext.Provider value={{newSetState, setNewSetState, newNoteState, setNewNoteState}}>
            {children}
        </NewSetContext.Provider>
    )    
}

export function useNewSetState() {
  return useContext(NewSetContext)!;
}