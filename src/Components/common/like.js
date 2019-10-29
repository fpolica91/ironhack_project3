import React from "react";

const Button = props => {
  
  const {disabled} = props
  
  // let classes;
  // if(props.disabled) classes ="disabled"

  return (
    <button
      onClick={props.onLike}
      style={{ cursor: "pointer" }}
      className="btn btn-success"
      aria-hidden="true"
      disabled={props.disabled} 
    >
      Like
    </button>
  );
};

export default Button;