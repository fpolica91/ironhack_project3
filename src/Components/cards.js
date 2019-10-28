import React from "react";
import { Link } from "react-router-dom";
import Button from "./common/like";
import SearchBar from "./common/searchBar";

const Card = props => {
  const { images } = props;
  return (
    <div className="container">
      <SearchBar onSearch={props.onQuery} searchTerm={props.searchTerm} />

      {images &&
        props.images.map(images => {
          if (images._id) {
            return (
              <div>
                <div className="card" key={images._id}>
                  <iframe className="card-img-top" src={images.image} />
                  <div className="card-body">
                    <h6 className="card-title">{images.owner.username}</h6>
                    <Link to={`/profile/${images.owner._id}`}> Profile </Link>

                    <p className="card-text"> {images.caption} </p>
                    <Link to={`post/${images._id}`}>View Experience</Link>
                  </div>

                  {images &&
                    images.tags.map(tag => {
                      return tag.split(" ").map(item => {
                        return <li>{item}</li>;
                      });
                    })}
                </div>
                <Button
                  disabled={images.disabled}
                  style={{ cursor: "pointer" }}
                  className="btn btn-success"
                  aria-hidden="true"
                  onLike={() => props.onLike(images)}
                />
                  
            
              </div>
            );
          } else {
            window.location.reload();
          }
        })}
    </div>
  );
};

export default Card;
