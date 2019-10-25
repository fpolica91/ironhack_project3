import React from 'react';
import ThreeMap from './ThreeMap';

const List = (props) => {
   const {images} = props
   console.log(images)
    return ( 
      <div>
          {images && props.images.map(image => {
            return (
            <div>
            <ThreeMap key={image._id} {...image} url={image.image}/>
            </div>

            )
          })}
      </div>
     );
}
 
export default List;