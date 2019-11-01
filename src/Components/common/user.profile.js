import React from 'react';
import { Redirect, Link, NavLink, Route, Switch } from "react-router-dom"
import SweetAlert from "react-bootstrap-sweetalert"
import Edit from './edit.form';




const UserProfile = (props) => {

    const { images, currentUser } = props

    const pics = images.filter(image => image.owner._id === currentUser._id)
    console.log(pics)



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


                    </div>
                </div>
                {pics && pics.map(pic => {
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
                                    {pic.tags.map(tag => {
                                        return tag.split(' ').map(item => {
                                            return (<li>{item}</li>)
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