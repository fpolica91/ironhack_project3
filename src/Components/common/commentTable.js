import React from 'react'
import CommentForm from './commentForm';
import Comments from './comments';


const CommentTable = (props) => {
    return (
        <div className="media">
            <div className="container" style={{ width: "60%" }} >

                <CommentForm
                    user={props.user}
                    image={props.image}
                    owner={props.owner}
                    handleSubmit={props.handleSubmit}
                    comments={props.comments}
                    handleChange={props.handleChange}
                />

                <Comments
                    image={props.image}
                />



            </div>
        </div>
    );
}

export default CommentTable;