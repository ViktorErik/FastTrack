import { useContext, useEffect, useRef, useState } from "react";
import { useLocation, useNavigate, useParams } from "react-router";
import { AuthContext } from "../providers/AuthProvider";
import "./ExerciseView.css";
import useSets, { deleteSetFromDatabase, submitNoteToDatabase, submitSetToDatabase } from "../data-handlers/setHandler";
import { Header } from "../navigation/Header";
import Set from "../classes/Set";
import { deleteExerciseFromDatabase, getDescription, submitDescriptionToDatabase, submitNameToDatabase } from "../data-handlers/exerciseHandler";
import type { User } from "firebase/auth";
import Note from "../classes/Note"
import { useNewSetState } from "../providers/NewSetProvider";
// import { SiNuke } from "react-icons/si";

// import { ImCheckmark } from "react-icons/im";


export function lengthCheck(inputRef: any, maxLength: number) {
    const newInput = inputRef.current?.value;        
    if (newInput && newInput.length > maxLength) inputRef.current.value = inputRef.current.value.slice(0, maxLength);
}

const pad = (x: string | number | Date) => {         
    return x.toString().padStart(2, "0");        
}



type NoteCardProps = {
    user: User,
    exerciseId: string,
    refreshSets: () => void,
    note: Note,
}


// Notes are stored as sets so that I can sort by date easier etc
function NoteCard({ user, exerciseId, refreshSets, note }: NoteCardProps) {

    const textRef = useRef<HTMLTextAreaElement>(null);
    const yearRef = useRef<HTMLInputElement>(null);
    const monthRef = useRef<HTMLInputElement>(null);
    const dayRef = useRef<HTMLInputElement>(null);
    const hourRef = useRef<HTMLInputElement>(null);
    const minuteRef = useRef<HTMLInputElement>(null);
    

    const [, setSubmitted] = useState(note.getSubmitted());
    const [deletePressed, setDeletePressed] = useState(false);
    const {setNewNoteState } = useNewSetState();


    async function submitNote() {
        const text = textRef.current!.value;        

        const year   = pad(yearRef.current!.value); //HDKSK
        const month  = pad(monthRef.current!.value)
        const day    = pad(dayRef.current!.value)
        const hour   = pad(hourRef.current!.value)
        const minute = pad(minuteRef.current!.value)                    
        
        
        const date: Date = new Date(`\
${pad(year)}-\
${pad(month)}-\
${pad(day)}T\
${pad(hour)}:\
${pad(minute)}\
`);        
        
        note.setDate(date);

        // await submitSetToDatabase(user, exerciseId, new Set(set.getId(), setNumber, weight, reps, true, date));
        await submitNoteToDatabase(user, exerciseId, new Note(text, date, note.getId(), true))
        setSubmitted(true);
        note.setSubmitted(true);        

        refreshSets();

    }

    async function deleteNote() {
        await deleteSetFromDatabase(user, exerciseId, note.getId());
        refreshSets();        
    }
    
    return (
        <div className="card">            

            {!note.getSubmitted() ?     
                <div>
                    <form className="timeInputs">
                        <input type="number" onChange={() => lengthCheck(yearRef, 4)} ref={yearRef} placeholder="Year" defaultValue={pad(note.getDate()?.getFullYear()!)}/>
                        <input type="number" onChange={() => lengthCheck(monthRef, 2)} ref={monthRef} placeholder="Month" defaultValue={pad(note.getDate()?.getMonth()!+1)}/>
                        <input type="number" onChange={() => lengthCheck(dayRef, 2)} ref={dayRef} placeholder="Day" defaultValue={pad(note.getDate()?.getDate()!)}/>
                        <input type="number" onChange={() => lengthCheck(hourRef, 2)} ref={hourRef} placeholder="Hour" defaultValue={pad(note.getDate()?.getHours()!)}/>
                        <input type="number" onChange={() => lengthCheck(minuteRef, 2)} ref={minuteRef} placeholder="Minute" defaultValue={pad(note.getDate()?.getMinutes()!)}/>
                    </form>

                    <form className="noteInputs">
                        <textarea placeholder="Shat my pants last set" ref={textRef} onChange={() => lengthCheck(textRef, 200)}/>
                        <button type="button" onClick={() => {
                            setNewNoteState(false);
                            submitNote();
                            }}>
                            <p>Submit</p>
                        </button>
                    </form>
                </div>            
                :
                <>
                    <p>{note.getText()}</p>
                    <sub> {pad(note.getDate()?.getHours()!)}:{pad(note.getDate()?.getMinutes()!)} {pad(note.getDate()?.getDate()!)}/{pad(note.getDate()?.getMonth()!+1)} - {pad(note.getDate()?.getFullYear()!)}&nbsp;&nbsp;&nbsp;</sub>                    
                </>
            }

            {deletePressed ?

                <div className="deleting">
                    <button onClick={() => {
                        setNewNoteState(false);
                        deleteNote()}}>
                        Confirm</button>
                    <button onClick={() => setDeletePressed(false)}>Cancel</button>
                </div>
                :                
                <button className="notDeleting" onClick={() => {
                    setDeletePressed(true)}}>
                    Delete Note
                </button>
            }
                    
        </div>
    )

}


type SetCardProps = {
    set: Set;
    user: User;
    exerciseId: string;
    refreshSets: () => void;
}


function SetCard({ set, user, exerciseId, refreshSets } : SetCardProps) {
    // let date: Date = new Date();
    
    const setNumberRef = useRef<HTMLInputElement>(null);
    const weightRef = useRef<HTMLInputElement>(null);
    const repsRef = useRef<HTMLInputElement>(null);
    
    const yearRef = useRef<HTMLInputElement>(null);
    const monthRef = useRef<HTMLInputElement>(null);
    const dayRef = useRef<HTMLInputElement>(null);
    const hourRef = useRef<HTMLInputElement>(null);
    const minuteRef = useRef<HTMLInputElement>(null);

    const [, setSubmitted] = useState(set.getSubmitted());
    const [deletePressed, setDeletePressed] = useState(false);
    const {setNewSetState } = useNewSetState();
    // const {newNoteState, setNewNoteState } = useNewSetState();

    

    async function submitSet() {
        const setNumber = setNumberRef.current!.value;
        const weight = weightRef.current!.value;
        const reps = repsRef.current!.value;



        const year   = pad(yearRef.current!.value); //HDKSK
        const month  = pad(monthRef.current!.value)
        const day    = pad(dayRef.current!.value)
        const hour   = pad(hourRef.current!.value)
        const minute = pad(minuteRef.current!.value)
        
        
        const date: Date = new Date(`\
${pad(year)}-\
${pad(month)}-\
${pad(day)}T\
${pad(hour)}:\
${pad(minute)}\
`);        
        
        set.setDate(date);

        await submitSetToDatabase(user, exerciseId, new Set(set.getId(), setNumber, weight, reps, true, date));
        setSubmitted(true);
        set.setSubmitted(true);
        set.setSetNumber(setNumber);
        set.setWeight(weight);
        set.setReps(reps);

        refreshSets();

    }

    async function deleteSet() {
        await deleteSetFromDatabase(user, exerciseId, set.getId());
        refreshSets();        
    }
    
    

    return (
        <div className="card">
            {/* {set.getId()} */}
            {/* <b>{date.getHours()}:{date.getMinutes()} {date.getDate()}/{date.getMonth() + 1} - {date.getFullYear()}</b> */}

            {!set.getSubmitted() ?     
                <div>
                    <form className="timeInputs">
                        <input type="number" onChange={() => lengthCheck(yearRef, 4)} ref={yearRef} placeholder="Year" defaultValue={pad(set.getDate()?.getFullYear()!)}/>
                        <input type="number" onChange={() => lengthCheck(monthRef, 2)} ref={monthRef} placeholder="Month" defaultValue={pad(set.getDate()?.getMonth()!+1)}/>
                        <input type="number" onChange={() => lengthCheck(dayRef, 2)} ref={dayRef} placeholder="Day" defaultValue={pad(set.getDate()?.getDate()!)}/>
                        <input type="number" onChange={() => lengthCheck(hourRef, 2)} ref={hourRef} placeholder="Hour" defaultValue={pad(set.getDate()?.getHours()!)}/>
                        <input type="number" onChange={() => lengthCheck(minuteRef, 2)} ref={minuteRef} placeholder="Minute" defaultValue={pad(set.getDate()?.getMinutes()!)}/>
                    </form>

                    <form className="setInputs">
                        <input type="number" placeholder="Set #" ref={setNumberRef} onChange={() => lengthCheck(setNumberRef, 10)} />
                        <input type="number" placeholder="Weight" ref={weightRef} onChange={() => lengthCheck(weightRef, 10)}/>
                        <input type="number" placeholder="Reps" ref={repsRef} onChange={() => lengthCheck(repsRef, 10)}/>
                        <button type="button" onClick={() => {
                            setNewSetState(false);
                            submitSet();
                            }}>
                            <p>Submit</p>
                        </button>
                    </form>
                </div>            
                :
                <>
                    <sub> {pad(set.getDate()?.getHours()!)}:{pad(set.getDate()?.getMinutes()!)} {pad(set.getDate()?.getDate()!)}/{pad(set.getDate()?.getMonth()!+1)} - {pad(set.getDate()?.getFullYear()!)}&nbsp;&nbsp;&nbsp;</sub>
                    <p>Set {set.getSetNumber()} &nbsp;&nbsp;&nbsp;</p>                    
                    <p>Weight: {set.getWeight()} &nbsp;&nbsp;&nbsp;</p>
                    <p>Reps: {set.getReps()} &nbsp;&nbsp;&nbsp;</p>
                </>
            }

            {deletePressed ?

                <div className="deleting">
                    <button onClick={() => {
                        setNewSetState(false);
                        deleteSet()}}>
                        Confirm</button>
                    <button onClick={() => setDeletePressed(false)}>Cancel</button>
                </div>
                :                
                <button className="notDeleting" onClick={() => {
                    setDeletePressed(true)}}>
                    Delete Set
                </button>
            }
                    
        </div>
    )
}


const ExerciseView = () => {

    const auth = useContext(AuthContext);
    const exerciseId = useParams()["exerciseId"]; // Ta från länk
    
    const [activeTab, setActiveTab] = useState('sets');
    const navigate = useNavigate();
    const { sets, getSets } = useSets(exerciseId!);
    const { newSetState, setNewSetState } = useNewSetState();
    const {newNoteState, setNewNoteState } = useNewSetState();
    
        

    const location = useLocation();
    const exerciseName: string = location.state["exerciseName"];

    const nameRef = useRef<HTMLInputElement>(null);
    const descriptionRef = useRef<HTMLInputElement>(null);

    

    const [deletePressed, setDeletePressed] = useState(false);

    useEffect(() => {  
        if (!auth || !auth.curUser) navigate("/");

    })   
    
    const [exerciseNameState, setExerciseNameState] = useState("");
    const [descriptionState, setDescriptionState] = useState("");
    useEffect(() => {
        getDescription(auth?.curUser!, exerciseId!).then((result) => {
            setDescriptionState(result);
        });
        setExerciseNameState(exerciseName);
    }, [auth])
    
    // async function addSet(exerciseId: string): Promise<void> {
    //     for (let set of sets) {
    //         if (!set.getSubmitted()) return;
    //     }
    //     await addSetToDatabase(auth!.curUser!, exerciseId);
    //     getSets();
    // }


    async function deleteExercise(user: User, exerciseId: string, emailConfirmation: string) {//, updateExercises: () => void) {
        if (emailConfirmation == auth?.curUser?.email) {
            await deleteExerciseFromDatabase(user, exerciseId);
            navigate("/");
        }
        // updateExercises();
    }

    async function changeExerciseName() {
        const newName: string = nameRef.current!.value;
        setExerciseNameState(newName);
        submitNameToDatabase(auth?.curUser!, exerciseId!, newName);
    }

    function setDescription() {
        const newDescription = descriptionRef.current!.value;
        setDescriptionState(newDescription);
        submitDescriptionToDatabase(auth?.curUser!, exerciseId!, newDescription);
    }


    return (
        <>
            <Header/>

            <div className="tabs">
                <button className={activeTab === 'sets' ? 'active' : 'inactive'} 
                        onClick={() => setActiveTab("sets")}>Sets
                </button>
                <button className={activeTab === 'details' ? 'active' : 'inactive'} 
                        onClick={() => setActiveTab('details')}>Details
                </button>
            </div>

            {activeTab === 'sets' &&        

            <div className="setList">

                {sets.map((set: Set | Note) => (     
                    set instanceof Set?
                    <SetCard key={set.getId()} set={set as Set} exerciseId={exerciseId!} user={auth?.curUser!} refreshSets={getSets}/>  
                    :
                    <NoteCard key={set.getId()} user={auth?.curUser!} exerciseId={exerciseId!} note={set} refreshSets={getSets}></NoteCard>                      
                ))}  

                {/* <NoteCard user={auth?.curUser!} exerciseId={exerciseId!} refreshSets={getSets}/> */}

                {newSetState?
                <SetCard key={"1"} set={new Set("1", undefined, undefined, undefined, false, new Date())} exerciseId={exerciseId!} user={auth?.curUser!} refreshSets={getSets}/>  
                :    
                <></>
                }

                {newNoteState?
                <NoteCard key={"2"} user={auth?.curUser!} exerciseId={exerciseId!} refreshSets={getSets} note={new Note("", new Date(), "2", false)}/>
                :
                <></>
                }

                <button className="addButton" onClick={() => setNewSetState(true)}>
                    Add Set
                </button>


                <button className="addButton" onClick={ () => setNewNoteState(true)}>
                    Add Note
                </button>
            </div>
            }

            {activeTab === 'details' && 
            <div className="details">
                <div className="inputs">
                    <input type="text" defaultValue={exerciseNameState} ref={nameRef} onChange={() => lengthCheck(nameRef, 50)}/>
                    <input type="submit" value="Submit" onClick={changeExerciseName}/>
                </div>
                
                {deletePressed ?                
                <input type="text" onChange={(e) => deleteExercise(auth?.curUser!, exerciseId!, e.target.value)} placeholder="Enter your email to delete the exercise."/>
                :
                // <button id="deleteExercise" onClick={() => deleteExercise(auth?.curUser!, exerciseId!)}>
                <>
                    <div className="inputs">                    
                        <input className="description" type="text" ref={descriptionRef} onChange={() => lengthCheck(descriptionRef, 50)} defaultValue={descriptionState || ""} placeholder="Add a description or details."/>
                        <input type="submit" value="Submit" onClick={setDescription}/>
                    </div>
                    <button className="deleteButton" onClick={() => setDeletePressed(true)}>
                        Delete Exercise
                    </button>
                </>
                }
            </div>
            }       
        </>
    )
}

export default ExerciseView