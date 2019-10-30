import React from 'react'



const Dbutton = (props) => {


    return (
        <button
            className="btn btn-danger"
            style={{ cursor: "pointer" }}
            onClick={props.onDelete}
        >
            Delete
        </button>
    );
}

export default Dbutton;