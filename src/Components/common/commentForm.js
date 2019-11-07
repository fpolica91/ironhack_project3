import React from 'react'
import "./css/commentForm.css"

const CommentForm = (props) => {
    const { user, owner, image } = props
    return (
        <div className="media-body" >
            <div class="media mt-3 shadow-textarea">
                <img class="d-flex rounded-circle avatar z-depth-1-half mr-3" src={user.imageUrl}
                    alt="Generic placeholder image" />
                <div class="media-body">
                    <h5 class="mt-0 font-weight-bold blue-text">{user.username}</h5>
                    <div class="form-group basic-textarea rounded-corners">
                        <form onSubmit={(e) => props.handleSubmit(e, image, owner)}>
                            <textarea class="form-control z-depth-1"
                                value={props.comments}
                                name="comments"
                                onChange={e => props.handleChange(e)}
                                id="exampleFormControlTextarea345" rows="3"
                                placeholder="Write your comment..." />
                            <button>save</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default CommentForm;