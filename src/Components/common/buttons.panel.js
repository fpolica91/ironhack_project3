import React from 'react';


const ButtonPanel = (props) => {
    return (
        <div className="d-flex  justify-content-center " >

            <button
                className="btn btn-sm  btn-primary"
                onClick={e => props.handleFollow(props.user)}
            >
                <i className="fa fa-user-plus">{props.message ? props.message : props.messagE === true ? "Following" : !props.messagE ? "Follow" : "Loading"}</i>
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
    );
}

export default ButtonPanel;