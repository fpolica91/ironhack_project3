import React from 'react'
import "./css/commentForm.css"



const Comments = (props) => {

    return (
        <div >
            {
                props.image.comments.length === 0 ? "No Comments" :
                    props.image.comments.map(comment => {
                        console.log(comment.user)
                        return (
                            <div class="media">
                                <div class="media-body" style={{

                                    border: "solid"

                                }}>
                                    <div className="d-flex  justify-content-center ">
                                        <div>
                                            <img class="d-flex rounded-circle avatar z-depth-1-half mr-3" src={comment.user.imageUrl}
                                                alt="Avatar" />
                                            <h5 class="mt-0 font-weight-bold blue-text">{comment.user.username}</h5>
                                        </div>
                                        <p >{comment.comment}</p>
                                    </div>
                                </div>
                            </div>
                        )
                    })
            }
        </div>

    );
}

export default Comments;