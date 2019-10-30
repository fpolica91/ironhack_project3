import React from "react";
import { Link } from "react-router-dom";

const NavBar = props => {
  const { currentUser } = props;


  if (currentUser !== null) {
    return (
      <div>
        <Link to="/newPost">Create Experience</Link>
        <br />
        <Link to="/images">Images</Link>
        <br />
        <Link to="/public"> Public Post</Link>
        <br />
        {props.currentUser &&
          <Link to={`/profile/${props.currentUser._id}`}>Profile</Link>
        }
      </div>
    );
  } else {
    return (
      <div>
        <Link to="/login">Login</Link>
        <br />
        <Link to="/signup">Signup</Link>
        <br />


      </div>
    );
  }
};

export default NavBar;
