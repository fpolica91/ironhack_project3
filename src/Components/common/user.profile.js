import React from 'react';
import { Redirect, Link, NavLink, Route, Switch } from "react-router-dom"
import SweetAlert from "react-bootstrap-sweetalert"
import Edit from './edit.form';
import Following from './user.follow';
import Followed from "./user.following"
import "../../user.follow.css";





const UserProfile = (props) => {

    const { images, currentUser, users } = props

    const pics = images.filter(image => image.owner._id === currentUser._id)
    let url = props.match.params.id



    if (currentUser) {
        return (
            <div>
                <div className="user-profile">
                    {currentUser && <p>Welcome {currentUser.username}    </p>}
                    {currentUser && <img src={currentUser.imageUrl} style={{
                        borderRadius: 70
                    }} />}
                    <div className="buttons" >
                        <button
                            onClick={props.onLogout}
                            className="btn btn-sm btn-danger">
                            Logout
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
                            currentUser={props.currentUser}
                            users={props.users}
                        />
                    }

                    {props.showFollowing === true &&

                        <Followed
                            currentUser={props.currentUser}
                            users={props.users}
                        />
                    }


                </div>
                {pics && pics.map(pic => {
                    console.log(pic)
                    return (

                        <div className="worldContainer">
                            <div className="col col-s-12 worldPost" key={pic._id} >
                                <div className="worldImgContainer">
                                    <img className="worldImg" src={pic.image} alt="worldPic" width="100%" height="300px" />
                                    <Link to={`/post/${pic._id}`}> <div className="overlayContainer" >
                                        <div className="textOverlay" id={pic._id}>See the full Post</div>
                                    </div>
                                    </Link>
                                </div>
                                <div>
                                    <p>{pic.caption}</p>
                                    {pic.tags && pic.tags.map(tag => {
                                        return tag.split(' ').map(item => {
                                            return (
                                                <div>
                                                    <li>{item}</li>
                                                </div>

                                            )
                                        })
                                    })}





                                </div>

                                <div className="actions" >
                                    <button className="btn btn-sm btn-danger" onClick={e => props.confirmDelete()} >
                                        Delete
                                </button>

                                    <button onClick={() => props.handleModal(pic)} >
                                        edit
                                </button>

                                    {pic.modal &&
                                        <Edit
                                            tags={props.tags}
                                            caption={props.caption}
                                            image={pic}
                                            submitUpdate={props.submitUpdate}
                                            handleUpdate={props.handleUpdate}
                                        />
                                    }



                                </div>

                                {props.showConfirm === true &&
                                    <SweetAlert
                                        warning
                                        showCancel
                                        confirmBtnText="Confirm!"
                                        confirmBtnBsStyle="danger"
                                        cancelBtnBsStyle="default"
                                        title="Are you sure?"
                                        onConfirm={e => props.onDelete(pic._id)}
                                        onCancel={e => props.cancelDelete()}
                                    >
                                        Do you want to delete this post?
                               </SweetAlert>
                                }


                                <div className="likes-div">
                                    {

                                        pic.likes.length === 0 ? "No one likes this" :
                                            pic.likes.length < 2 ? `${pic.likes[0].username} Likes this` :
                                                pic.likes.length === 2 ? `${pic.likes[0].username} and ${pic.likes[1].username}  Like this` :
                                                    pic.likes.length > 2 ? `${pic.likes[0].username} , ${pic.likes[1].username}  
                                                and ${pic.likes.length - 2}
                                                others Like this` : null

                                    }
                                </div>




                                <div className="comments-div" style={{ border: "solid" }}>
                                    {
                                        pic.comments.length === 0 ? "No Comments" :
                                            pic.comments.map(comment => {
                                                return (
                                                    <div>
                                                        <span>{comment.user.username}</span>
                                                        <p>{comment.comment}</p>
                                                    </div>
                                                )
                                            })
                                    }
                                    <form onSubmit={(e) => props.handleSubmit(e, pic, currentUser)}>

                                        <button style={{
                                            border: "0",

                                        }}>  <i className="fa fa-comments-o" /> </button>

                                        <textarea value={props.comments} name="comments" onChange={(e) => props.handleUpdate(e)} />

                                        <button>save</button>
                                    </form>

                                </div>




                            </div>
                        </div>

                    )
                })}
                {!pics.length && <p>You dont have any posts </p>}
            </div>
        );
    } else {
        return (
            <Redirect to='/login' />
        )
    }

}

export default UserProfile;