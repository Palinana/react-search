import React from 'react';
import Loader from '../Spinner/loader.gif';

import './Posts.css';

const Posts = ({ posts, loading }) => {
    if (loading) {
        return <img src={Loader} className={`search__loader ${loading ? 'show' : 'hide' }`} alt="loader"/>;

    }
    
    return (
        <ul className='list-group mb-4'>
            {posts.map(post => (
                <li key={post.id} className='list-group-item'>
                    {post.title}
                </li>
            ))}
        </ul>
    )
}

export default Posts;
