import React from 'react';

import Posts from './Post';


const Feed = ({ posts }) => {
    return (
        <>
            {posts.map(posts => (
                <Posts key={posts.id} posts={posts} />
            ))}
        </>
    )
}

export default Feed


