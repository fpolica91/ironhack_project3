import React from 'react';
import Following from './user.follow';
import Followed from './user.following';

const PublicProfile = (props) => {
    const { id } = props.match.params
    const { users, currentUser, images } = props

    const user = users.filter(user => user._id === id)[0]
    const followed = user && currentUser ? user.followers.filter(follower => follower._id === currentUser._id) : null

    let public_images = images ? images.filter(image => image.owner._id === id) : "Loading..."




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
                        <i className="fa fa-user-plus">{props.message ? props.message : message() === true ? "Following" : !message() ? "Follow" : "Loading"}</i>
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

                <div className="public-images">

                    {public_images.map(public_image => {
                        console.log(public_image)
                        return (
                            <span key={public_image._id}>
                                <img src={public_image.image}
                                    alt={`${public_image.owner.username}'s image`} />
                                <div>
                                    <div className="likes-div">
                                        {

                                            public_image.likes.length === 0 ? "No one likes this" :
                                                public_image.likes.length < 2 ? `${public_image.likes[0].username} Likes this` :
                                                    public_image.likes.length === 2 ? `${public_image.likes[0].username} and ${public_image.likes[1].username}  Like this` :
                                                        public_image.likes.length > 2 ? `${public_image.likes[0].username} , ${public_image.likes[1].username}  
                                                and ${public_image.likes.length - 2}
                                                others Like this` : null

                                        }
                                    </div>

                                    <div className="comments-div" style={{ border: "solid" }}>
                                        {
                                            public_image.comments.length === 0 ? "No Comments" :
                                                public_image.comments.map(comment => {
                                                    return (
                                                        <div>
                                                            <span>{comment.user.username}</span>
                                                            <p>{comment.comment}</p>
                                                        </div>
                                                    )
                                                })
                                        }


                                    </div>



                                    <form onSubmit={(e) => props.handleSubmit(e, public_image, user)}>

                                        <button style={{
                                            border: "0",

                                        }}>  <i className="fa fa-comments-o" /> </button>

                                        <textarea value={props.comments} name="comments" onChange={(e) => props.handleChange(e)} />

                                        <button>save</button>
                                    </form>


                                </div>

                            </span>
                        )
                    })}


                </div>



            </div>
        )
    } else {
        return <p>loading...</p>
    }
}

export default PublicProfile;