import React from 'react';
import './Input.css';

const Input = ({ handleChange, query, name }) => {
    return (
        <div className="input-group flex-nowrap mt-4">
            <input 
                type="text" 
                id="box" 
                placeholder="Search anything..." 
                className="form-control"
                name={name}
                value={query}
                onChange={handleChange}
            />
            <i className="fa fa-search search-icon" aria-hidden="true"/>
        </div>
    )
}

export default Input;
