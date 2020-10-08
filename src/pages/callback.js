import React, { useEffect, useState, useContext } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { AuthContext } from "../contexts/AuthContext";
import { SPOTIFY } from "../helpers/constants";

const Callback = () => {
    const { search = [] } = useLocation();
    const [callbackCodeToken, setcallbackCodeToken] = useState(undefined);
    const [isAuthorized, setIsAuthorized] = useState(undefined);
    const { authGetToken, authError, authData } = useContext(AuthContext);

    (() => {
        if(callbackCodeToken) return;

        const queryParams = search.split("?");
        const queryParamVerified = queryParams.find(data => data.includes(SPOTIFY.ACCESS_ALLOWED))
        if(queryParamVerified) {
            const tokenCode = queryParamVerified.replace("code=", "")
            setcallbackCodeToken(tokenCode);
            setIsAuthorized(true);
            return;
        }

        setIsAuthorized(false);
    })();

    useEffect(() => {
        if(authData) return;

        authGetToken(callbackCodeToken);
    }, [authData])

    if(!isAuthorized || authError || authData) {
        return <Redirect to={{pathname: "/"}} />
    }

    return <>Aguarde...</>;
}

export default Callback;
