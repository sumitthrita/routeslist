import React, { useCallback, useEffect, useRef, useState } from 'react';
import * as tt from '@tomtom-international/web-sdk-maps';
import * as ttapi from '@tomtom-international/web-sdk-services';
import { Link, useLocation } from 'react-router-dom';
import '@tomtom-international/web-sdk-maps/dist/maps.css'


const Map = props => {
    const route = props.route
    const mapElement = useRef()
    const [map, setMap] = useState({})


    const convertToPoints = (lngLat) => {
        return {
            point: {
                latitude: lngLat.lat,
                longitude: lngLat.lng
            }
        }
    }

    const drawRoute = (geoJson, map) => {
        if(map.getLayer('route')){
            map.removeLayer('route')
            map.removeSource('route')
        }
        map.addLayer({
            id: 'route',
            type: "line",
            source : {
                type : 'geojson',
                data: geoJson
            },
            paint: {
                'line-color' : 'red',
                'line-width' : 6
            }
        })
    }

    const addDeliveryMarker = (lngLat, map) => {
        const element = document.createElement('div')
        element.className = "mapStopMarker"
        new tt.Marker({
            element: element
        })
        .setLngLat(lngLat)
        .addTo(map)
    }

    useEffect(() => {
        const destinations = [] 
        const origin = {
            lng : parseFloat(route.startPoint.longitude),
            lat : parseFloat(route.startPoint.latitude)
        }

        let map = tt.map({
            key : process.env.REACT_APP_TOM_TOM_API_KEY,
            container: mapElement.current,
            stylesVisibility:{
                trafficIncidents: true,
                trafficFlow: true
            },
            center: [parseFloat(route.startPoint.longitude), parseFloat(route.startPoint.latitude)],
            zoom: 9
        })
    
        setMap(map)

        const addMarker = (lngLat, type) => {
            // lngLat = [lng, lat]
            const popupOffset = {
                bottom: [0, -20]
            }
            if(type === "origin"){
                const popup = new tt.Popup({ offset: popupOffset}).setHTML("This is you!")

                const element = document.createElement('div')
                element.className = "mapMarker"

                const marker = new tt.Marker({
                    draggable: false,
                    element : element,
                })
                    .setLngLat(lngLat)
                .addTo(map)

                marker.setPopup(popup).togglePopup()
            } 
            if(type === "stop"){
                const element = document.createElement('div')
                element.className = "mapStopMarker"

                const marker = new tt.Marker({
                    draggable: false,
                    element : element,
                })
                    .setLngLat(lngLat)
                .addTo(map)
            }
            if(type === "destination"){
                const popup = new tt.Popup({ offset: popupOffset}).setHTML("Destination.")
                const element = document.createElement('div')
                element.className = "mapDestinationMarker"

                const marker = new tt.Marker({
                    draggable: false,
                    element : element,
                })
                    .setLngLat(lngLat)
                .addTo(map)
                marker.setPopup(popup).togglePopup()
            }
        }

        addMarker([parseFloat(route.startPoint.longitude), parseFloat(route.startPoint.latitude)], "origin");

        //Create route // will return array of objects {lng: 12, lat: 12} only and taking array of same type of objects
        const sortDestinations = (locations) => {
            const pointsForDestinations = locations.map((destination) => {
                return convertToPoints(destination);
            })

            const callParameters = {
                key : process.env.REACT_APP_TOM_TOM_API_KEY,
                destinations: pointsForDestinations,
                origins: [convertToPoints(origin)],
            }
    
            return new Promise((resolve, reject) => {
                ttapi.services
                    .matrixRouting(callParameters)
                    .then(apiresults => {
                        const results = apiresults.matrix[0]
                        const resultsArray = results.map((result, index) => {
                                                return {
                                                    location : locations[index],
                                                    drivingtime : result.response.routeSummary.travelTimeInSeconds,
                                                }
                                            })

                        resultsArray.sort((a,b) => {
                            return a.drivingtime - b.drivingtime
                        })
                        const sortedLocations = resultsArray.map(result => {
                            return result.location
                        })
                        resolve(sortedLocations)
                    })
            })

        }

        const recalculateRoutes = () => {
            // sortDestinations(destinations).then((sorted) => {
                const sorted = destinations;
                sorted.unshift(origin)
                // sorted is an array start from origin and other locations array of {lat: , lng: }
                ttapi.services
                    .calculateRoute({
                        key : process.env.REACT_APP_TOM_TOM_API_KEY,
                        locations : sorted,
                    })
                    .then(routeData => {
                        const geoJson = routeData.toGeoJson()
                        drawRoute(geoJson, map)
                    })
            // })
        }

        if(route.stops.length > 0) {
            route.stops.forEach(stop => {
                destinations.push({lat: parseFloat(stop.latitude), lng: parseFloat(stop.longitude)})
                addMarker([parseFloat(stop.longitude), parseFloat(stop.latitude)], "stop")
                recalculateRoutes()
            })
        }
        destinations.push({lat: parseFloat(route.endPoint.latitude), lng: parseFloat(route.endPoint.longitude)})
        addMarker([parseFloat(route.endPoint.longitude), parseFloat(route.endPoint.latitude)], "destination");
        recalculateRoutes()

        // map.on("click", (e) => {
        //     destinations.push(e.lngLat)
        //     addDeliveryMarker(e.lngLat, map)
        //     recalculateRoutes()
        // })

        return () => map.remove()
    },[])

    return (
        map && 
            <div>
                {/* <div className='goBack' >
                    <Link to="/routeslist" >Go Back</Link>
                </div> */}
            <div ref={mapElement} className="newMaps" />
            </div>
    )
}

export default Map;