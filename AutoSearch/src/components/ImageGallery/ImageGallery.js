import React from 'react';
import Image from '../UI/Image/Image';

const ImageGallery = ({ images }) => {
    return (
        <div className="row text-center text-lg-left mt-5">
            {images.map((image, ind) => {
                return (
                    <Image image={image} key={ind}/>
                )
            })}            
        </div>
    )
}

export default ImageGallery;
