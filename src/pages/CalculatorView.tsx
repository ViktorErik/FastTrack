
// x = 1RM
// x = Weight * (1 + Reps/30) // 1RM (reps på vikt som parameter)
// x / Weight = 1 + Reps / 30
// Reps = 30x / Weight - 30  // Reps på vikt (vikt, 1RM)
// Weight = x / (1 + Reps/30) // Vikt på Reps (Reps, 1RM)

import { useState } from "react";
import "./CalculatorView.css";

type MaxCardProps = {
    reps: number;
    weight: number;
    repMax: number;
    unit: string;
}

const MaxCard = ({ reps, weight, repMax, unit }: MaxCardProps) => {

    let oneRepMax: number;
    let maxWeight: number;

    // oneRepMax = Number((weight * (1 + reps/30)).toFixed(2));
    if (reps == 1 && repMax == 1) {
        maxWeight = weight;
    }   
        
    else if (reps == 1) {
        oneRepMax = weight;
        maxWeight = Number((oneRepMax / (1 + repMax/30)).toFixed(2));
    }

    else {
        oneRepMax = Number((weight * (1 + reps/30)).toFixed(2));
        if (repMax == 1) maxWeight = oneRepMax;
        else maxWeight = Number((oneRepMax / (1 + repMax/30)).toFixed(2));
    }

    return (
        <div>            
            {repMax}RM : {maxWeight} {unit}
        </div>
    );
}


export const CalculatorView = () => {

    const [weight, setWeight] = useState(0);
    const [reps, setReps] = useState(0);
    const [unit, setUnit] = useState("kg");

    return (
        <div className="calculatorDiv">
            <div className="inputElements">        
                <div className="weightInput">

                    <input onChange={ (e) => setWeight(Number((e.target as HTMLInputElement).value)) } type="number" placeholder="Enter Weight" />

                    <select onChange={(e) => setUnit(e.target.value)}>
                        <option value="kg">kg</option>
                        <option value="lbs">lbs</option>
                    </select>
                    
                    
                </div>

                <div className="repInput">
                    <input onChange={ (e) => setReps(Number((e.target as HTMLInputElement).value)) } type="number" placeholder="Enter Reps"/>
                </div>
            </div>
            
            <div className="repMaxDiv">
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((repMax) => (
                    <MaxCard key={repMax} reps={reps} weight={weight} repMax={repMax} unit={unit} />
                ))}
                {/* <MaxCard reps={reps} weight={weight}/> */}
            </div>

        </div>
    );
}