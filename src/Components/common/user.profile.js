import React from 'react';

const UserProfile = (props) => {

    const {images} = props
    const {id} = props.match.params

    let user =  props.images.filter(item =>  item.owner._id === props.match.params.id)
    console.log(user[0])
  
    return ( 
        <div>
         {user[0] &&   <p>Welcome, {user[0].owner.username}</p>}
        </div>
     );

}
 
export default UserProfile;