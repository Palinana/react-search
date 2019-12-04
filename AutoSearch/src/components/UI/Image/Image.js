import React from 'react';
import './Image.css';

const Image = ({ image }) => {
    return (
        <div className="col-lg-3 col-md-4 col-6">
            <div className="d-block mb-4 h-100">
                <img className="img-fluid" id="image" src={image.urls.regular} alt={image.alt_description} />
            </div>
        </div>
    )
}

export default Image;
