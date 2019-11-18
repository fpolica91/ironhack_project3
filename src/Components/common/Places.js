import React from 'react'


import { GoogleApiWrapper, InfoWindow, Map, Marker } from 'google-maps-react';

const Places = (props) => {

    const { images } = props
    const lat = images.lat
    const lng = images.long
    const style = {
        width: '30vw',
        height: '40vh',
        'marginLeft': 'auto',
        'marginRight': 'auto'
    }



    return (
        <div>
            {props.images &&
                <Map
                    style={style}
                    defaultZoom={10}
                    google={props.google}
                    initialCenter={{ lat: lat, lng: lng }}

                />
            }
        </div>
    );
}


export default GoogleApiWrapper({
    apiKey: ("AIzaSyDnSL1sGb9p0n57aHA5vawaGEkEk2IYKZU")
})(Places)