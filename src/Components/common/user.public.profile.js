import React from 'react';

const PublicProfile = (props) => {
    const { id } = props.match.params
    const { users, currentUser } = props
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

    console.log(message())


    if (followed !== null) {
        return (
            <div className="user-profile" >
                {user && <p>Welcome, {user.username}</p>}
                {user && <img src={user.imageUrl} style={{
                    borderRadius: 70
                }} />}
                <div className="button" >
                    <button
                        className="btn btn-sm  btn-primary"
                        onClick={e => props.handleFollow(e, user._id)}
                    >
                        {message()}
                        <i className="fa fa-user-plus">{props.message ? props.message : message() ? "Following" : !message() ? "Follow" : "Loading"}</i>
                    </button>
                </div>
            </div>
        )
    } else {
        return <p>loading...</p>
    }
}

export default PublicProfile;