import React from "react";

const Like = props => {
   if(props) {
       console.log(props.liked)
   }
  let classes = "fa fa-heart";
  if(!props.liked) classes+="-o"

  return (
    <i
      onClick={props.onLike}
      style={{ cursor: "pointer" }}
      className={classes}
      aria-hidden="true"
    />
  );
};

export default Like;