import React, { useState, useEffect } from 'react';
import Posts from './components/Posts/Posts';
import Pagination from './components/Pagination/Pagination';
import axios from 'axios';

import './App.css';

const App = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [currentPage, setCurrentPage] = useState(1);
    const [postsPerPage] = useState(10);

    useEffect(() => {
        const fetchPosts = async () => {
            setLoading(true);
            const res = await axios.get('https://jsonplaceholder.typicode.com/posts');
            setPosts(res.data);
            setLoading(false);
        }

        fetchPosts();
    }, []);

    // Get current posts
    const indexOfLastPost = currentPage * postsPerPage;
    const indexOfFirstPost = indexOfLastPost - postsPerPage;
    const currentPosts = posts.slice(indexOfFirstPost, indexOfLastPost);

    // Change page
    const paginate = pageNumber => setCurrentPage(pageNumber);

    return (
        <div className='container'>
            {/* Heading */}
            <h1 className='pb-3 pt-5 headaing__primary'>My Blog</h1>
            
            {/* Posts */}
            <Posts posts={currentPosts} loading={loading} />

            {/* Pagination */}
            <Pagination
                postsPerPage={postsPerPage}
                totalPosts={posts.length}
                paginate={paginate}
            />
        </div>
    );
}

export default App;
