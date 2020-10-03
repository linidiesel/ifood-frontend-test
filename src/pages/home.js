import React from 'react';
import { withRouter } from "react-router";

import { StartsWithSpotifyLink } from '../components/Button'
import Filter from '../components/Filter'
import { STATUS } from "../helpers/constants";

import './home.css';

const HomeUnauthorized = () =>
    <div className="home-unauthorized">
        <p className="home-unauthorized-wellcome">Olá! (:</p>
        <p>Para darmos início a essa experiência, será necessário termos permissões na sua conta do spotify </p>
        <p>Vamos começar?</p>
        <StartsWithSpotifyLink />
    </div>

const HomeAuthorized = () => {
    return (<Filter/>)
}

const Home = ({ location = {} }) => {
    const isUserUnauthorized = location.state?.status === STATUS.USER_UNAUTHORIZED;

    if(isUserUnauthorized)
        return <HomeUnauthorized/>

    return <HomeAuthorized/>
}

export default withRouter(Home);
