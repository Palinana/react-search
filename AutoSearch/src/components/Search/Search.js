import React from 'react';

import Input from '../UI/Input/Input';
import './Search.css';

const Search = ({ handleChange, query }) => {
    return (
        <div className="row search">
            <div className="col-sm-9 col-md-7 col-lg-5 mx-auto justify-content-center mt-5">
                {/* Heading */}
                <h2 className="text-center mt-5 search__heading">Live Search: React Application</h2>

                {/* Search Input */}
                <Input 
                    query={query}
                    handleChange={handleChange}
                />
            </div>
        </div>
    )
}

export default Search;
