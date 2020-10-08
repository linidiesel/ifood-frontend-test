import React, { useState, createContext, useEffect } from "react";
import { getToken, getRefreshToken } from "../services/spotify";

const AuthContext = createContext();

const AuthContextProvider = (props) => {
    const [queryFilters, setQueryFilters] = useState({});
    const [authData, setAuthData] = useState(localStorage.getItem("token"));
    const [authError, setAuthError] = useState(null);

    const setSelectedFilter = (filter) => setQueryFilters({ ...queryFilters, ...filter });

    const setError = (error) => {
      if(error.message === "401") {
        localStorage.removeItem("token");
        localStorage.removeItem("refresh-token");
        setAuthData(null);
      }
    }

    const saveToken = (data, isRefreshTokenSave = false) => {
      localStorage.setItem("token", data.access_token);

      if(isRefreshTokenSave)
        localStorage.setItem("refresh-token", JSON.stringify({ token: data.refresh_token, expireInSeconds: data.expires_in }))

      setAuthData(data);
    }

    const authGetToken = (authToken) => {
        if(authData) return;

        getToken(authToken)
        .then(data => {
            saveToken(data, true);
            authRefreshTokenIntervalStarts(data);
            })
        .catch(error => setAuthError(error));
    }

    const authRefreshTokenIntervalStarts = () => {
      const localRefreshToken = JSON.parse(localStorage.getItem("refresh-token"))

      if(!localRefreshToken) return;

      const { token, expireInSeconds } = localRefreshToken;
      const interval = setInterval(() => {
        getRefreshToken(token)
        .then(saveToken)
        .catch(error => setAuthError(error));
      }, expireInSeconds * 1000);
      return interval;
    }

    useEffect(() => {
      const interval = authRefreshTokenIntervalStarts();
      return () => clearInterval(interval);
    }, [])

    return (
      <AuthContext.Provider value={{ setSelectedFilter, authGetToken, queryFilters, authData, authError, setError }}>
        {props.children}
      </AuthContext.Provider>
    );

  };
export { AuthContextProvider, AuthContext };
