import React, { useContext } from 'react';
import { withRouter } from "react-router";

import { StartsWithSpotifyLink } from '../components/Button'
import Filter from '../components/Filter'
import List from '../components/List';

import { AuthContext } from "../contexts/AuthContext";
import './home.css';

const HomeUnauthorized = () =>
    <div className="home-unauthorized">
        <p className="home-unauthorized-wellcome">Olá! (:</p>
        <p>Para darmos início a essa experiência, será necessário termos permissões na sua conta do spotify </p>
        <p>Vamos começar?</p>
        <StartsWithSpotifyLink />
    </div>

const HomeAuthorized = () =>
    <>
        <Filter/>
        <List/>
    </>

const Home = () => {
    const { authData } = useContext(AuthContext)

    if(!authData)
        return <HomeUnauthorized/>

    return <HomeAuthorized/>
}

export default withRouter(Home);
