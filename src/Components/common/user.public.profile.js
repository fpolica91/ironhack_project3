import React from 'react';
import Following from './user.follow';
import Followed from './user.following';

const PublicProfile = (props) => {
    const { id } = props.match.params
    const { users, currentUser } = props
    // const public_user = users.filter(user => user._id === id)/
    // console.log(public_user)
    const user = users.filter(user => user._id === id)[0]



    // const followers = user.followers.map(follower => console.log(follower))
    const followed = user && currentUser ? user.followers.filter(follower => follower === currentUser._id) : null
    console.log(followed)


    let message = () => {
        if (followed !== null) {
            if (followed.length) {
                return true
            } else {
                return false
            }
        }
    }



    if (followed !== null) {
        return (
            <div className="user-profile" >
                {user && <p>Welcome, {user.username}</p>}
                {user && <img src={user.imageUrl} style={{
                    borderRadius: 70
                }} />}
                <div className="buttons" >
                    <button
                        className="btn btn-sm  btn-primary"
                        onClick={e => props.handleFollow(user)}
                    >
                        {message()}
                        <i className="fa fa-user-plus">{props.message ? props.message : message() ? "Following" : !message() ? "Follow" : "Loading"}</i>
                    </button>

                    <button
                        id="followers"
                        className="btn btn-sm btn-primary"
                        onClick={(e) => props.showFollow(e)}
                    >
                        Followers
                         </button>

                    <button
                        id="following"
                        className="btn btn-sm btn-secondary"
                        onClick={(e) => props.showFollow(e)}
                    >
                        Following
                         </button>

                </div>
                {props.showFollowers === true &&
                    <Following
                        users={props.users}
                        currentUser={user}
                    />
                }

                {props.showFollowing === true &&
                    <Followed
                        currentUser={user}
                        users={props.users}
                    />
                }






            </div>
        )
    } else {
        return <p>loading...</p>
    }
}

export default PublicProfile;