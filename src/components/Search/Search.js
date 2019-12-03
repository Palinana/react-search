import React, { Component } from 'react';

import Input from '../UI/Input/Input';
import './Search.css';

class Search extends Component {
    state = {
        query: '',
        results: [],
        loading: false,
        message: ''
    }

    handleChange = (event) => {
        // const query = event.target.value;
        // console.log('query ',query)
        this.setState({ [event.target.name]: event.target.value })

    } 

    render() {
        const { query, loading } = this.state;

        return (
            <div className="row col-sm-9 col-md-7 col-lg-5 mx-auto justify-content-center mt-5">
                {/* Heading */}
                <h2 className="text-center mt-5">Live Search: React Application</h2>

                {/* Search Input */}
                <Input 
                    query={query}
                    name={'query'}
                    handleChange={this.handleChange}
                />
            </div>
        )
    }
}

export default Search;
