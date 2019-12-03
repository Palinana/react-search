import React, { Component } from 'react';
import axios from 'axios';

import Search from '../components/Search/Search';
import ImageGallery from '../components/ImageGallery/ImageGallery';
import Loader from '../components/UI/Spinner/loader.gif';
import './App.css';

class App extends Component {
    state = {
        query: '',
        results: {},
        loading: false,
        message: '',
        cancel: ''
    }

    cancel = '';

    handleChange = (event) => {
        const query = event.target.value;

		if(!query) {
			this.setState({ query, results: {}, message: '', totalPages: 0, totalResults: 0 });
        } 
        else {
			this.setState({ query, loading: true, message: '' }, () => {
				this.fetchSearchResults(1, query);
			});
		}
    } 

    // Fetch the search results and update the state with the result.
    // Also cancels the previous query before making the new one.
    fetchSearchResults = (updatedPageNumber = '', query) => {
        const pageNumber = updatedPageNumber ? updatedPageNumber : '';
        const searchUrl = `https://api.unsplash.com/search/photos?page=${pageNumber}&per_page=12&query=${query}&client_id=051ad1f704f43a3a6e49378c05e3eb4afd550c897de6ba15cad23e20fd920ee7`;

        if(this.cancel) {
            this.cancel.cancel();
        }

        this.cancel = axios.CancelToken.source();

        axios.get(searchUrl, {
            cancelToken: this.cancel.token
        })
            .then(res => {
                console.log('data ', res.data)
                const resultNotFoundMsg = !res.data.results.length
                    ? 'There are no more search results. Please try a new search'
                    : '';
                this.setState({
                    results: res.data.results,
                    message: resultNotFoundMsg,
                    loading: false
                })
            })
            .catch( error => {
                if (axios.isCancel(error) || error) {
                    this.setState({
                        loading: false,
                        message: 'Failed to fetch the data. Please check network'
                    })
                }
            })
    }

    render() {
        const { query, loading, message, results } = this.state;

        return (
            <div className="container text-center">
                {/* Search Input*/}
                <Search
                    query={query}
                    handleChange={this.handleChange}
                />

                {/*	Error Message*/}
				    {message && <p className="message">{message}</p>}

                {/*	Loader*/}
			        <img src={Loader} className={`search__loader ${loading ? 'show' : 'hide' }`} alt="loader"/>

                {/*	Result*/}
                {
                    Object.keys(results).length && results.length ? 
                    <ImageGallery images={results}/>
                    : null
                }
            </div>
        )
    }
}

export default App;
