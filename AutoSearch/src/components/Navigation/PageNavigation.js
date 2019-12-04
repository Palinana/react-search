import React from 'react';
import './PageNavigation.css';

const PageNavigation = ({ showPrevLink, showNextLink, handlePrevClick, handleNextClick, }) => {
    return (
        <div className="row mx-auto justify-content-center mt-5">
            <button 
                type="button" 
                className={
					`btn btn-outline-dark btn-navigation
					${ showPrevLink ? 'show' : 'hide'}`
                }
                onClick={handlePrevClick}
            >
                Prev
            </button>

            <button 
                type="button" 
                className={
					`btn btn-outline-dark btn-navigation
					${ showNextLink ? 'show' : 'hide'}`
                }
                onClick={handleNextClick}
            >
                Next
            </button>
        </div>
    )
}

export default PageNavigation;
