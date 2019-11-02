import React from 'react'
import { Link } from "react-router-dom"




const Following = ({ users, currentUser }) => {
    const user_followers = users.filter(user => user._id === currentUser._id)
        .map(user => user.followers)[0]

    const user_following = users.filter(user => user._id === currentUser._id)
        .map(user => user.following)[0]
    return (
        <div className="follower-container">
            <div className="followers">
                {user_followers &&
                    user_followers.map(follower => {
                        console.log("follower is", follower)
                        return (
                            <li> <Link to={`/public/profile/${follower._id}`}>{follower.username}</Link></li>
                        )
                    })
                }
            </div>
            <div className="following">
                {user_following &&
                    user_following.length ?
                    user_following.map(follower => {
                        return (
                            <li> <Link to={`/public/profile/${follower._id}`}>{follower.username}</Link></li>
                        )
                    })
                    : <p>You are not following anyone </p>
                }
            </div>
        </div>
    )

}

export default Following;