import React from "react";
import { Link } from "react-router-dom";

const NavBar = props => {
  const { currentUser } = props;
  console.log(currentUser);

  if (currentUser !== null) {
    return (
      <div>
        <Link to="/newPost">Create Experience</Link>
        <br />
        <Link to="/images">Images</Link>
        <br />
        <Link to="/profile"> Profile</Link>
        <br />
        <Link to="/public"> Public Post</Link>
        <br />
      </div>
    );
  } else {
    return (
      <div>
        <Link to="/login">Login</Link>
        <br />
        <Link to="/signup">Signup</Link>
      </div>
    );
  }
};

export default NavBar;
