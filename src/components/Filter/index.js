import React, { useEffect, useState, useContext } from 'react';
import InputMask from "react-input-mask";
import Container from '@material-ui/core/Container';
import { AuthContext } from '../../contexts/AuthContext';

import { getFilters } from "../../services/filter";

import "./filter.css";

const Filter = () => {
    const [dataFilter, setDataFilter] = useState(undefined);
    const { setSelectedFilter } = useContext(AuthContext);

    const [timestamp, setTimestamp] = useState('10/10/2019 10:20')
    const [limit, setLimit] = useState(1);
    const [country, setCountry] = useState(undefined);
    const [locale, setLocale] = useState(undefined);

    useEffect(() => {
        getFilters()
            .then((data) => {
                setDataFilter(data);
            })
            .catch(error => console.log("error dta filter", error))
    }, []);

    const SelectCountry = ({ data }) =>
        <div className="filter-wrapper-item" id={data.id}>
            <select id="filter-country" value={country} name={data.id} onChange={({ currentTarget }) => { setCountry(currentTarget.value); setSelectedFilter({ [`${currentTarget.name}`] : currentTarget.value })}}>
                {data.values.map(item => <option key={item.value} value={item.value}>{ item.name }</option>)}
            </select>
        </div>

    const SelectLocale = ({ data }) =>
    <div className="filter-wrapper-item" id={data.id}>
        <select id="filter-locale" value={locale} name={data.id} onChange={({ currentTarget }) => { setLocale(currentTarget.value); setSelectedFilter({ [`${currentTarget.name}`] : currentTarget.value })}}>
            {data.values.map(item => <option key={item.value} value={item.value}>{ item.name }</option>)}
        </select>
    </div>;

    const convertDate = ({ currentTarget }) => {
        try {
            const date = currentTarget.value.split("/");
            const hour = date[2].toString().substring(5,10);
            const addHours = hour.includes("_") ? "" : hour;
            date[2] = date[2].toString().substring(0,4);
            const dateFormat = new Date(`${date[2]}/${date[1] - 1}/${date[0]} ${addHours}`);
            dateFormat.toLocaleDateString("pt-BR", {})
            const isoDate = dateFormat.toISOString();
            setTimestamp(currentTarget.value);
            setSelectedFilter({ timestamp: isoDate })
        } catch (error){}
    }

    const InputTimestamp = (props) => {
        return (
            <div className="filter-wrapper-item">
                <InputMask id="filter-timestamp" mask="99/99/9999 99:99" placeholder="dd/mm/yyyy hh:mm" onChange={props.onChange} defaultValue={props.value} onBlur={convertDate}/>
            </div>)
    }

    const InputLimitToPagination = ({ data }) => {
        const { validation = {} } = data || {};
        return (
            <div className="filter-wrapper-item">
                <input
                    type="number"
                    id="filter-limit"
                    max={validation.max}
                    min={validation.min}
                    defaultValue={limit}
                    onBlur={({ currentTarget }) => { setLimit(currentTarget.value); setSelectedFilter({ limit: currentTarget.value })}}/>
            </div>)
    }

    const expectedFilters = {
        'locale': (data) => (<SelectLocale data={data}/>),
        'country': (data) => (<SelectCountry data={data}/>),
        'timestamp': () => (<InputTimestamp value={timestamp}/>),
        'limit': (data) => (<InputLimitToPagination data={data}/>),
    }

    const findById = (id)=> dataFilter?.filters?.find(item => item.id === id);

    if(dataFilter?.filters){
        return (
            <Container>
                <div className="filter-container">
                    { dataFilter.filters.map(filter => {
                        const element = expectedFilters[`${filter.id}`];
                        if(element) return <React.Fragment key={filter.id}>{element(findById(filter.id))}</React.Fragment>;
                    })}
                </div>
            </Container>);
    }

    return <p>Buscando filtros ...</p>
}

export default Filter;
