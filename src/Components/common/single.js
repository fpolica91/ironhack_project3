import React from "react";
import ThreeMap from "../ThreeMap";

let height = "70vh";
let width = "100vw";
const requestFullscreen = function(ele) {
  if (ele.requestFullscreen) {
    ele.requestFullscreen();
  } else if (ele.webkitRequestFullscreen) {
    ele.webkitRequestFullscreen();
  } else if (ele.mozRequestFullScreen) {
    ele.mozRequestFullScreen();
  } else if (ele.msRequestFullscreen) {
    ele.msRequestFullscreen();
  } else {
    console.log("Fullscreen API is not supported.");
  }
};

var exitFullscreen = function() {
  let theCanvas = document.getElementsByTagName("canvas")[0];

  if (theCanvas.style.height === "100vh") {
    theCanvas.style.height = "70vh";
  } else {
    theCanvas.style.height = "100vh";
  }
};

window.addEventListener("fullscreenchange", exitFullscreen);
window.addEventListener("webkitfullscreenchange", exitFullscreen);
window.addEventListener("mozfullscreenchange", exitFullscreen);
window.addEventListener("MSFullscreenChange", exitFullscreen);

const Single = props => {
    
  const fullScreen = e => {
    e.preventDefault();
    let myDiv = document.getElementById("WebGL-output");
    requestFullscreen(myDiv);
  };

  const { images } = props;
  const { id } = props.match.params;
  if (id) {
    return (
      <React.Fragment>
        <button onClick={fullScreen}>Go Full Screen</button>
        <div>
          {images &&
            props.images
              .filter(item => item._id === props.match.params.id)
              .map(image => {
                return (
                  <ThreeMap key={image._id} {...image} url={image.image} />
                );
              })}
        </div>
      </React.Fragment>
    );
  } else {
    return <p>...loading</p>;
  }
};

export default Single;
