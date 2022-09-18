import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { GoogleMap, useJsApiLoader, Marker, DirectionsRenderer } from '@react-google-maps/api';
import Button from './Button';

const containerStyle = {
  width: '800px',
  height: '600px'
};

const center = {
  lat: 28.7041,
  lng: 77.1025
};

const google = window.google;

const ViewMap = props => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.GOOGLE_MAP_KEY
  })

  const [map, setMap] = useState(null)
  const [directionsResponse, setDirectionsResponse] = useState(null)
  const [markerOne, setMarkerOne] = useState(null)
  const [markerTwo, setMarkerTwo] = useState(null)
  const [stops, setStops] = useState(null)

  useEffect(() => {
    if(props.route){
        setMarkerOne({lat: parseFloat(props.route.startPoint.latitude), lng: parseFloat(props.route.startPoint.longitude)})
        setMarkerTwo({lat: parseFloat(props.route.endPoint.latitude), lng: parseFloat(props.route.endPoint.longitude)})
        let newStops = []
        props.route.stops.map(stop => {
            newStops.push({lat : parseFloat(stop.latitude), lng: parseFloat(stop.longitude)})
        })
        setStops(newStops)
    }
  },[])

  const calculateDirection = () => {
    //eslint-disable-next-line no-undef
    const directionsService = new window.google.maps.DirectionsService()
    let start = new window.google.maps.LatLng(props?.route?.startPoint.latitude, props.route.startPoint.longitude)
    let end = new window.google.maps.LatLng(props?.route?.endPoint.latitude, props.route.endPoint.longitude)
    // let start = props.route.startPoint.latitude
    // let end = props.route.endPoint.latitude
    let request = {
            origin : start,
            destination : end,
            //eslint-disable-next-line no-undef
            travelMode : window.google.maps.TravelMode.DRIVING 
        }
    directionsService.route(request, function(result, status){
        if(status == "OK"){
            console.log(result);
            setDirectionsResponse(result)
        }
    })
  }

  const onLoad = useCallback(function callback(map) {
    const bounds = new window.google.maps.LatLngBounds(center);
    map.fitBounds(bounds);
    setMap(map)
    calculateDirection()
  }, [])

  const onUnmount = () => {
    setMap(null)
    setDirectionsResponse(null)
  }

    return (
        <div>
            {/* <Button label="GetDirection" handleMe={calculateDirection} /> */}
            {isLoaded ? 
                <GoogleMap
                    mapContainerStyle={containerStyle}
                    center={markerOne}
                    zoom={6}
                    onLoad={onLoad}
                    onUnmount={onUnmount}
                >
                    <Marker position={markerOne} />
                    {stops && stops?.map(stop => {
                        return (
                            <Marker position={stop} />
                        )
                    })}
                    <Marker position={markerTwo} />
                    {directionsResponse && <DirectionsRenderer directions={directionsResponse} />} 
                </GoogleMap>
            :
                <div>Its loading</div>
            }
        </div>
    )
}

export default memo(ViewMap)