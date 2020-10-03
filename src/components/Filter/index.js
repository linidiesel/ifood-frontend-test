import React, { useEffect, useState } from 'react';
import InputMask from "react-input-mask";

import { getFilters } from "../../services/filter";

import "./filter.css";

const SelectLocale = ({ data = {} }) => {
    console.log(data);
    return (
        <div className="filter-wrapper-item">
        <select>
            {data.values.map(locale => <option>{ locale.name }</option>)}
        </select></div>);
}

const SelectCountry = ({ data = {} }) => {
    console.log(data);
    return (
        <div className="filter-wrapper-item">
            <select>
                {data.values.map(country => <option>{ country.name }</option>)}
            </select>
        </div>);
}

const InputTimestamp = (props) => {
    return (<div className="filter-wrapper-item"><InputMask mask="9999-12-31T23:59:59" placeholder="yyyy-mm-ddThh:mm:ss" onChange={props.onChange} value={props.value} /></div>)
}

const InputLimitPagination = ({ data }) => {
    const { validation = {} } = data || {};
    return (<div className="filter-wrapper-item"><input type="number" max={validation.max} min={validation.min}/></div>)
}

const teste = {
    'locale': (data) => (<SelectLocale data={data}/>),
    'country': (data) => (<SelectLocale data={data}/>),
    'timestamp': () => (<InputTimestamp/>),
    'limit': (data) => (<InputLimitPagination data={data}/>),
}

const Filter = () => {
    const [dataFilter, setDataFilter] = useState(undefined);

    useEffect(() => {
        getFilters()
            .then((data) => {
                setDataFilter(data);
            })
            .catch(error => console.log("error dta filter", error))
    }, []);

    if(dataFilter?.filters){
        return (<>
            <div className="filter-container">
                <SelectLocale data={dataFilter?.filters?.find(item => item.id === 'locale')}/>
                <SelectCountry data={dataFilter?.filters?.find(item => item.id === 'country')}/>
                <InputTimestamp />
                <InputLimitPagination data={dataFilter?.filters?.find(item => item.id === 'limit')}/>
            </div>
        </>);
    }

    return <p>Ainda nao tem nda ali.</p>
}

export default Filter;
