import React, { useEffect, useState, useContext } from 'react';
import { AuthContext } from '../../contexts/AuthContext';

import { getPlaylists } from "../../services/spotify";

import "./list.css";

const List = () => {
    const { queryFilters } = useContext(AuthContext);
    const [data, setData] = useState(null);
    const [token] = useState(localStorage.getItem("token"));

    useEffect(() => {
        console.log("query", queryFilters);
        const mountQueryParams = Object.keys(queryFilters).map((param) => `${param}=${queryFilters[param]}`);
        getPlaylists(token, mountQueryParams.join('&'))
            .then((data) => {
                console.log("ta entrando aqui ", data)
                setData(data)
            }) //tratar os catchs.
            .catch(error => console.log("num deu", error))
    }, [queryFilters])

    return <p>Eh a lista</p>
}

export default List;
