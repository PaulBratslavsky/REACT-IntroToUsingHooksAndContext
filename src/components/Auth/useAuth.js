import React from "react";
import firebase from "../../firebase";

function useAuth() {
    const [ authUser, setAuthUser ] = React.useState(null);

    React.useEffect(() => {
        
        const unsubscribe = firebase.auth.onAuthStateChanged(user => {
            user
                ? setAuthUser(user)
                : setAuthUser(null);
        })

        return () => unsubscribe();

    },[]);

    return authUser;
}

export default useAuth;
