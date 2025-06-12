import { useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { AuthContext } from "../providers/AuthProvider";
import "./ExerciseView.css";
import useSets, { addSetToDatabase } from "../data-handlers/setHandler";

import Set from "../classes/Set";


type SetCardProps = {
    set: Set;
}


function SetCard({set} : SetCardProps) {
    return (
        <div className="card">
            {set.getId()}
        </div>
    )
}

const ExerciseView = () => {

    const auth = useContext(AuthContext);
    const navigate = useNavigate();
    const exerciseId = useParams()["exerciseId"]; // Ta från länk

    const { sets, getSets } = useSets(exerciseId!);

    useEffect(() => {  
        if (!auth || !auth.curUser) navigate("/");

    })    
    
    async function addSet(exerciseId: string): Promise<void> {
        await addSetToDatabase(auth!.curUser!, exerciseId);
        getSets();
    }

    return (
        <div className="setList">

            {sets.map((set: Set) => (               
                <SetCard key={set.getId()} set={set}/>
            ))}  

            <button onClick={ () => addSet(exerciseId!) }>
                Add Set
            </button>
        </div>
    )
}

export default ExerciseView