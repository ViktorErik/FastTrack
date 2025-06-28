
import { useContext } from "react";
import { AuthContext } from "../providers/AuthProvider";
import { useNavigate } from "react-router";

export const Header = () => {
    
    const auth = useContext(AuthContext);
    const navigate = useNavigate();

    return (

        <header>
            {/* <img src="FastTrack/src/assets/FastTrack.png" alt="Loading" /> */}
            <input type="image" src="/FastTrack/FastTrack.png" alt="Logo Loading" onClick={() => navigate("/")}/>
            <button onClick={ auth?.curUser ? auth?.signOutUser :  auth?.signInUser }>
                {auth?.curUser ? "Sign out" : "Sign in"}
            </button>
        </header>
    );
}