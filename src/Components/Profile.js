import React from 'react';

class Profile extends React.Component{
  
        state = {
            user: this.props.currentUser

        }

render(){
    if(this.props.currentUser){
        return (
            <div>
            <h1> HELL YEAH! PROFILE PAGE!</h1>
           </div>
        )
    }else{
    return (
        <div>GO TO LOGING PAGE!</div>
    )
}
}
    
}

export default Profile;