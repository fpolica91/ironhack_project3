import React from 'react'
import { Link } from "react-router-dom"
import "../../user.follow.css";




const Following = ({ users, currentUser }) => {
    const user_followers = users.filter(user => user._id === currentUser._id)
        .map(user => user.followers)[0]

    console.log(user_followers)

    // const user_following = users.filter(user => user._id === currentUser._id)
    //     .map(user => user.following)[0]
    return (
        <div className="follower-container  box" role="dialog" >
            <div className="followers">
                <h5>
                    <div className="heading" >
                        followers
                    </div>
                </h5>

                {user_followers &&
                    user_followers.map(follower => {

                        return (
                            <li className="follow_li" >
                                <div >
                                    <div className="image-div" >

                                        <span className="image-span" >

                                            {follower.imageUrl &&
                                                <img style={{
                                                    height: "100%",
                                                    width: "100%",
                                                    cursor: "pointer",
                                                    margin: 0,
                                                    padding: 0,
                                                    verticalAlign: "baseline"
                                                }}
                                                    src={follower.imageUrl}
                                                    alt={`${follower.username} profile picture`} />
                                            }
                                        </span>


                                    </div>
                                    <Link to={`/public/profile/${follower._id}`}>{follower.username}</Link>
                                </div>
                            </li>
                        )
                    })
                }
            </div>
        </div>

    )

}

export default Following;