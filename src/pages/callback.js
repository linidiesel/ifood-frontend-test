import React, { useEffect, useState } from 'react';
import { useLocation, Redirect } from 'react-router-dom';
import { getToken } from "../services/spotify";
import { SPOTIFY, STATUS } from "../helpers/constants";

const Callback = () => {
    //Tratamento de erro para a exception do effect
    const { search = [] } = useLocation();
    const [token, setToken] = useState(undefined);
    const [authToken, setAuthToken] = useState(undefined);

    (() => {
        if(authToken) return;

        const queryParams = search.split("?");
        const auth = queryParams.find(data => data.includes(SPOTIFY.ACCESS_ALLOWED))
        if(auth){
            setAuthToken(auth.replace("code=", ""))
        }
    })();

    const RedirectUser = (status) =>
        <Redirect
            to={{
            pathname: "/",
            state: { status }
        }}>
        </Redirect>

    useEffect(() =>{
        getToken(authToken)
        .then(data => {
            localStorage.setItem("token", data.access_token);
            setToken(data.access_token);
            })
        .catch(error => console.log("error", error));
    }, [authToken])

    if(!authToken) {
        return <RedirectUser status={STATUS.USER_UNAUTHORIZED}/>
    }

    if(token){
        return <RedirectUser status={STATUS.USER_AUTHORIZED}/>
    }

    return <>Aguarde...</>;
}

export default Callback;
