import React from 'react';
import {Redirect} from "react-router-dom"

const UserProfile = (props) => {

    const {images, currentUser} = props
    const {id} = props.match.params

    let user =  props.images.filter(item =>  item.owner._id === props.match.params.id)
    console.log(user[0])

    if(currentUser){
    return ( 
        <div>
         {user[0] &&   <p>Welcome, {user[0].owner.username}</p>}
        {user[0] && <img src={user[0].owner.imageUrl} />}
        <button
         onClick={props.onLogout} 
        className="btn btn-danger">Logout</button>
        </div>
     );
    }else{
        return(
            <Redirect to='/login'/>
        )
    }

}
 
export default UserProfile;