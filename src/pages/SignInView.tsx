import { useContext, useEffect } from "react";
import { Link, useNavigate } from 'react-router'
import { AuthContext } from "../providers/AuthProvider";


export const SignInView = () => {

    const auth = useContext(AuthContext);
    const navigate = useNavigate();


    useEffect(() => {
        if (auth?.curUser) navigate("/ExerciseListView");
    }, [auth?.curUser])

    

    return (
        <>                
            <button onClick={ auth?.test }>Test</button>
            <button onClick={ auth?.signIn }>Sign in</button>
            <Link to="/ExerciseListView">View Exercises</Link>           
        </>
    )
}

export default SignInView;