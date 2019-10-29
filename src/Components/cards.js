import React from "react";
import { Link } from "react-router-dom";
import Button from "./common/like";
import SearchBar from "./common/searchBar";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Card = props => {
  const { images } = props;
  // const notify = () => toast.error(props.errorMessage);
  return (
    <React.Fragment>
      <SearchBar onSearch={props.onQuery} searchTerm={props.searchTerm} />
      <div className="worldContainer" >


        {/* {props.errorMessage && <ToastContainer>{notify()}</ToastContainer>} */}

        {images &&
          props.images.map(images => {
            if (images._id) {
              return (
                <div className="col col-s-12 worldPost" key={images._id} >
                  <div>
                    <img src={images.owner.imageUrl} width="50px" height="50px" alt="miniProfilePic"></img>

                    {images.owner.username}
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
