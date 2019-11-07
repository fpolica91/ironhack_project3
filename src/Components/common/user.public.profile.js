import React from 'react';
import Following from './user.follow';
import Followed from './user.following';
// import Comments from './comments';
// import CommentForm from './commentForm';
// import Test from './testfile';
import CommentTable from './commentTable';
import Likes from './Likes';

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
                        return (
                            <div key={public_image._id} >
                                <img src={public_image.image}
                                    alt={`${public_image.owner.username}'s image`} />
                                <div>
                                    <div className="likes-div">

                                        <Likes
                                            pic={public_image}
                                        />
                                    </div>
                                    <CommentTable
                                        user={currentUser}
                                        image={public_image}
                                        owner={user}
                                        handleSubmit={props.handleSubmit}
                                        comments={props.comments}
                                        handleChange={props.handleChange}

                                    />

                                </div>
                            </div>
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