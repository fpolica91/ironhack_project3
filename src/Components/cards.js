import React from "react";
import { Link } from "react-router-dom";
import Button from "./common/like";
import SearchBar from "./common/searchBar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


const Card = props => {
  const { images, users, currentUser } = props;


  // const notify = () => toast.error(props.errorMessage); 
  return (
    <React.Fragment>
      <SearchBar onSearch={props.onQuery} searchTerm={props.searchTerm} />
      <div className="worldContainer" >
        {images &&
          images.map(images => {
            if (images._id && images.owner) {
              return (
                <div className="col col-s-12 worldPost" key={images._id} >
                  <div>

                    {images.owner && <img src={images.owner.imageUrl} width="50px" height="50px" alt="miniProfilePic" />}

                    {currentUser._id !== images.owner._id ? <Link to={`/public/profile/${images.owner._id}`}>{images.owner.username} </Link> : <p> <Link to={`/profile/${currentUser._id}`}>{currentUser.username} </Link>  </p>}



                  </div>

                  <div className="worldImgContainer">
                    <img className="worldImg" src={images.image} alt="worldPic" width="100%" height="300px"></img>

                    <Link to={`/post/${images._id}`}> <div className="overlayContainer" >
                      <div className="textOverlay" id={images._id}>See the full Post</div>
                    </div>
                    </Link>
                  </div>
                  <p>{images.caption}</p>

                  <div className="like-button">
                    <Button
                      disabled={images.disabled}
                      style={{ cursor: "pointer" }}
                      className="btn btn-success"
                      aria-hidden="true"
                      onLike={() => props.onLike(images)}
                    />

                    <p>{`${images.likes.length} likes`}</p>


                  </div>
                  {images && images.tags.map(tag => {
                    return tag.split(' ').map(item => {
                      return (<li>{item}</li>)
                    })

                  })}

                </div>
              )
            } else {
              window.location.reload();
            }
          })}


      </div>
    </React.Fragment>
  );
};

export default Card;
