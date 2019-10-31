import React from 'react';

const PublicProfile = (props) => {
    const { id } = props.match.params
    const { users } = props
    const user = users.filter(user => user._id === id)[0]



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
                    <i className="fa fa-user-plus"> Follow </i>
                </button>
            </div>
        </div>
    );
}

export default PublicProfile;