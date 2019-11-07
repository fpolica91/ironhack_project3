import React from 'react'

const Test = () => {
    return (
        <div className="card grey lighten-3 chat-room" >
            <div className="row px-lg-2 p-2">
                <div className="card-body">
                    <ul className="list-unstyled friend-list">
                        <li className="active grey lighten-3 p-2">
                            <a href="#" className="d-flex justify-content-between">
                                <img src="https://mdbootstrap.com/img/Photos/Avatars/avatar-8.jpg" alt="avatar" className="avatar rounded-circle d-flex align-self-center mr-2 z-depth-1" />
                                <div className>
                                    <strong>John Doe</strong>
                                    <p className="last-message text-muted">Hello, Are you there?</p>
                                </div>
                                <div className="chat-footer">
                                    <p className="text-smaller text-muted mb-0">Just now</p>
                                    <span className="badge badge-danger float-right">1</span>
                                </div>
                            </a>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
}

export default Test;