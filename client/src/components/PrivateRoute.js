import Axios from 'axios'
import React, { useState, useEffect } from 'react'

function UserRoute(props) {
    const [post, setPost] = useState({})
    console.log(props)

    useEffect(()=> {
        let id = props.match.params.user_id
        Axios.get(`https://jsonplaceholder.typicode.com/posts/${id}`)
        .then(res => setPost(res.data))
    }, [])

    const container = {
        maxWidth: '70%',
        margin: 'auto'
    }

    const singlePost = (
        <div>
            <h3>{post.title}</h3>
            <div>{post.body}</div>
        </div>
    )

    return (
        <div style={container}>
            <h1>Private route</h1>
            {
                post ? singlePost : <h1>Loading...</h1>
            }
        </div>
    )
}   

export default UserRoute
