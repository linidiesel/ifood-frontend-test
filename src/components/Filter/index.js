import React, { useEffect, useState, useContext } from 'react';
import InputMask from "react-input-mask";
import { AuthContext } from '../../contexts/AuthContext';

import { getFilters } from "../../services/filter";

import "./filter.css";



const Filter = () => {
    const [dataFilter, setDataFilter] = useState(undefined);
    const { setSelectedFilter } = useContext(AuthContext);

    useEffect(() => {
        getFilters()
            .then((data) => {
                setDataFilter(data);
            })
            .catch(error => console.log("error dta filter", error))
    }, []);

    const SelectLocaleOrCountry = ({ data }) =>
    <div className="filter-wrapper-item" id={data.id}>
        <select name={data.id} onChange={({ target }) => setSelectedFilter({ [`${target.name}`] : target.value })}>
            {data.values.map(item => <option>{ item.name }</option>)}
        </select>
    </div>;

    const InputTimestamp = (props) =>
        <div className="filter-wrapper-item">
            <InputMask mask="9999-12-31T23:59:59" placeholder="yyyy-mm-ddThh:mm:ss" onChange={props.onChange} value={props.value} />
        </div>

    const InputLimitToPagination = ({ data }) => {
        const { validation = {} } = data || {};
        return (
            <div className="filter-wrapper-item">
                <input type="number" max={validation.max} min={validation.min}/>
            </div>)
    }

    const expectedFilters = {
        'locale': (data) => (<SelectLocaleOrCountry data={data}/>),
        'country': (data) => (<SelectLocaleOrCountry data={data}/>),
        'timestamp': () => (<InputTimestamp/>),
        'limit': (data) => (<InputLimitToPagination data={data}/>),
    }

    const findById = (id)=> dataFilter?.filters?.find(item => item.id === id);

    if(dataFilter?.filters){
        return (
            <div className="filter-container">
                { dataFilter.filters.map(filter => {
                    const element = expectedFilters[`${filter.id}`];
                    if(element) return element(findById(filter.id));
                })}
            </div>);
    }

    return <p>Ainda nao tem nda ali.</p>
}

export default Filter;
