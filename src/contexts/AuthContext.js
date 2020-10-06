import React, { useState, createContext, useEffect } from "react";
import { getToken, getRefreshToken } from "../services/spotify";

const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [queryFilters, setQueryFilters] = useState({});
    const [authData, setAuthData] = useState(null);
    const [authError, setAuthError] = useState(null);
    const [isAuthorized, setIsAuthorized] = useState(false);

    const setSelectedFilter = (filter) => setQueryFilters({ ...queryFilters, ...filter });

    const authGetToken = (authToken) => {
        if(authData) return;

        getToken(authToken)
        .then(data => {
            localStorage.setItem("token", data.access_token);
            authRefreshTokenIntervalStarts(data);
            setAuthData(data);
            })
        .catch(error => setAuthError(error));
    }

    const authRefreshTokenIntervalStarts = ({ expires_in: interval, refresh_token: refreshToken }) => {
      setInterval(() => {
        getRefreshToken(refreshToken)
        .then(data => localStorage.setItem("token", data.access_token))
        .catch(error => setAuthError(error));
      }, interval * 1000);
    }

    // useEffect(() => {
    //   const tokenCode = localStorage.getItem("token-code");
    //   console.log("aaaaa", tokenCode);
    //   // authGetToken(tokenCode);
    // })

    return (
      <AuthContext.Provider value={{ setSelectedFilter, authGetToken, queryFilters, authData, authError, isAuthorized, setIsAuthorized }}>
        {props.children}
      </AuthContext.Provider>
    );

  };
export { AuthContextProvider, AuthContext };
