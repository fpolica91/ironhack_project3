import React from 'react';
import {Link} from "react-router-dom"

const NavBar = () => {
    return ( 

        <div>
            <Link  to="/newPost">Create Experience</Link>
            <br/>
            <Link  to="/images">Images</Link>
            <br/>
            <Link  to="/profile"> Profile</Link>
            <br/>
            <Link  to="/public"> Public Post</Link>
            <br/>
            <Link  to="/login">Login</Link>
            <br/>
            <Link  to="/signup">Signup</Link>
        </div>
      
     );
}
 
export default NavBar;