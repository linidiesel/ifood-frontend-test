import React, { useEffect, useState, useContext } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { AuthContext } from "../contexts/AuthContext";
import { SPOTIFY, STATUS } from "../helpers/constants";

const Callback = () => {
    //Tratamento de erro para a exception do effect
    const { search = [] } = useLocation();
    const [callbackCodeToken, setcallbackCodeToken] = useState(undefined);
    const { authGetToken, authError, authData } = useContext(AuthContext);

    (() => {
        if(callbackCodeToken) return;

        const queryParams = search.split("?");
        const queryParamVerified = queryParams.find(data => data.includes(SPOTIFY.ACCESS_ALLOWED))
        if(queryParamVerified) {
            const tokenCode = queryParamVerified.replace("code=", "")
            localStorage.setItem("token-code", tokenCode)
            setcallbackCodeToken(tokenCode);
        }
    })();

    const RedirectUser = (status) =>
        <Redirect
            to={{
            pathname: "/",
            state: { status }
        }}>
        </Redirect>

    useEffect(() => {
        if(authData) return;
        console.log("oir")
        authGetToken(callbackCodeToken);
    }, [authData])

    if(!callbackCodeToken || authError) {
        return <RedirectUser status={STATUS.USER_UNAUTHORIZED}/>
    }

    if(authData){
        return <RedirectUser status={STATUS.USER_AUTHORIZED}/>
    }

    return <>Aguarde...</>;
}

export default Callback;
