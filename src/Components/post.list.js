import React from 'react';
import ThreeMap from './ThreeMap';

const List = (props) => {
   const {images} = props
 
    return ( 
      <div>
          {images && props.images.map(image => {
            return (
            <div>
            <ThreeMap key={image._id} {...image} url={image.image}/>
            </div>
            )
          })}
          {!images && window.location.reload()}
      </div>
     );
}
 
export default List;