import React, { Component } from 'react';
import axios from 'axios';

import Search from '../components/Search/Search';
import ImageGallery from '../components/ImageGallery/ImageGallery';
import PageNavigation from '../components/Navigation/PageNavigation';
import Loader from '../components/UI/Spinner/loader.gif';
import './App.css';

class App extends Component {
    state = {
        query: '',
        results: {},
        loading: false,
        message: '',
        totalResults: 0,
        totalPages: 0,
        currentPageNo: 0,
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
                const total = res.data.total;
				const totalPagesCount = this.getPageCount(total, 12);
                const resultNotFoundMsg = !res.data.results.length
                    ? 'There are no more search results. Please try a new search'
                    : '';
                this.setState({
                    results: res.data.results,
                    message: resultNotFoundMsg,
                    loading: false,
                    totalResults: total,
					totalPages: totalPagesCount,
					currentPageNo: updatedPageNumber
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

    // Get the Total Pages count
    getPageCount = (total, denominator) => {
        const divisible	= 0 === total % denominator;
        const valueToBeAdded = divisible ? 0 : 1;
		return Math.floor(total/denominator) + valueToBeAdded; // total number of pages
    }

    // Fetch results according to the prev or next page requests
    handlePageClick = (type, event) => {
        // event.preventDefault();

        const updatePageNo = type === 'prev' ? 
            this.state.currentPageNo - 1
            : this.state.currentPageNo + 1;
            
        if(!this.state.loading) {
            this.setState({ loading: true, message: '' }, () => {
                this.fetchSearchResults(updatePageNo, this.state.query);
            });
        }
    }

    render() {
        const { query, loading, message, results, currentPageNo, totalPages } = this.state;
        const showPrevLink = 1 < currentPageNo;
        const showNextLink = totalPages > currentPageNo;

        return (
            <div className="container text-center">
                {/* Search Input*/}
                <Search
                    query={query}
                    handleChange={this.handleChange}
                />

                {/*	Error Message*/}
				    {message && <p className="message mt-5">{message}</p>}

                {/*Navigation*/}
                <PageNavigation 
                    showPrevLink={showPrevLink}
                    showNextLink={showNextLink}
                    handlePrevClick={(event) => this.handlePageClick('prev', event)}
                    handleNextClick={(event) => this.handlePageClick('next', event)}
                />

                {/*	Result*/}
                {
                    Object.keys(results).length && results.length ? 
                    <ImageGallery images={results}/> : 
                    <img src={Loader} className={`search__loader ${loading ? 'show' : 'hide' }`} alt="loader"/>
                }

                {/*Navigation*/}
                <PageNavigation 
                    showPrevLink={showPrevLink}
                    showNextLink={showNextLink}
                    handlePrevClick={(event) => this.handlePageClick('prev', event)}
                    handleNextClick={(event) => this.handlePageClick('next', event)}
                />
            </div>
        )
    }
}

export default App;
