import React from 'react';
import Following from './user.follow';
import Followed from './user.following';
import CommentTable from './commentTable';
import Likes from './Likes';
import Tags from './tags';
import ButtonPanel from './buttons.panel';
import styled from 'styled-components'
import Places from './Places'
import { Link } from 'react-router-dom';


const imageBox = styled.div`
width: 400px;
height: 300px
`

const imgDiv = styled.img`
    width:100%, 
    height: 100%
`




const PublicProfile = (props) => {

    let location;
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
                <div  >


                    <ButtonPanel
                        handleFollow={props.handleFollow}
                        showFollow={props.showFollow}
                        messagE={message()}
                        user={user}
                        message={props.message}
                    />
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
                                <imageBox>
                                    <img
                                        style={{ height: "50%", width: "50%" }}
                                        src={public_image.image}
                                        alt={`${public_image.owner.username}'s image`}
                                    />
                                </imageBox>
                                <div>

                                    <Link>{public_image.address && public_image.address.city}</Link>
                                    <div className="tags-div">

                                        <Tags
                                            image={public_image}
                                        />
                                    </div>


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


                                    {
                                        public_image.coordinates !== undefined ?
                                            <div className="">
                                                {/* <Places
                                                    images={public_image.coordinates}
                                                /> */}
                                            </div>
                                            :
                                            null

                                    }
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