import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { toast } from 'react-toastify';
import { addRoute, showGeneralModalAction, updateRoute } from '../Redux/action';
import AddStops from './AddStops';
import Button from './Button';
import { emptyRoute, handleEvent } from './helpingFunctions';
import { faCircleXmark, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import ViewMap from './ViewMap';

const CreateRoute = props => {
    const [editable, setEditable] = useState(false)
    const [route, setRoute] = useState({})
    const [stopEditIndex, setStopEditIndex] = useState(null)

    const dispatch = useDispatch()

    useEffect(() => {
        if(props.route) {
            setRoute(props.route)
        } 
        if(props.editable){
            setEditable(props.editable)
        }
        if(props.source === "create"){
            setRoute(emptyRoute())
            setStopEditIndex(0)
        }
    },[])

    const handleChange = e => {
        switch (e.target.name) {
            case "name":
                setRoute({...route, name : e.target.value})
                break;
            case "startPointlatitude":
                let newRoute = {...route}
                let newStartPoint = {...newRoute.startPoint}
                newStartPoint.latitude = e.target.value
                newRoute.startPoint = newStartPoint
                setRoute(newRoute)
                break;
            case "startPointlongitude":
                let newRouteSLo = {...route}
                let newStartPointLo = {...newRouteSLo.startPoint}
                newStartPointLo.longitude = e.target.value
                newRouteSLo.startPoint = newStartPointLo
                setRoute(newRouteSLo)
                break;
            case "endPointlatitude":
                let newRouteELa = {...route}
                let newEndPointLa = {...newRouteELa.endPoint}
                newEndPointLa.latitude = e.target.value
                newRouteELa.endPoint = newEndPointLa
                setRoute(newRouteELa)
                break;
            case "endPointlongitude":
                let newRouteELo = {...route}
                let newEndPointLo = {...newRouteELo.endPoint}
                newEndPointLo.longitude = e.target.value
                newRouteELo.endPoint = newEndPointLo
                setRoute(newRouteELo)
                break;
            default:
                break;
        }

    }

    const handleEdit = () => {
        setEditable(true)
    }

    const handleViewMap = () => {
        let component = <ViewMap route={route} />
        const toSend = {
            component, 
            title: "Route",
            showModal: true,
            handleClose: closeModal
            }
        dispatch(showGeneralModalAction(toSend))
    }

    const closeModal = () => {
        const toSend = {
            showModal: false
        }
        dispatch(showGeneralModalAction(toSend))
    }

    const handleSave = () => {
        if(route.name !== "" && route.startPoint.latitude !=="" && route.startPoint.longitude !== ""
            && route.endPoint.latitude !== "" && route.endPoint.longitude !== ""
        ) { 
            if(route.stops[route.stops.length-1].name !== "" && route.stops[route.stops.length-1].latitude !== "" && route.stops[route.stops.length-1].longitude !== ""){
                route.stops = route.stops;
            } else {
                route.stops = []
            }
            if(props.source === "update"){
                dispatch(updateRoute(props.routeIndex, route))
            } else if(props.source === "create"){
                dispatch(addRoute(route))
            }
        } else {
            if(route.name === ""){
                toast.error("Please enter route name.")
                handleEvent("routeName", "focus")
            } else if(route.startPoint.latitude === ""){
                toast.error("Please enter latitude value of start point.")
                handleEvent("startLat", "focus")
            } else if(route.startPoint.longitude === ""){
                toast.error("Please enter longitude value of start point.")
                handleEvent("startLong", "focus")
            } else if(route.endPoint.latitude ===""){
                toast.error("Please enter latitude value of end point.")
                handleEvent("endLat", "focus")
            } else if(route.endPoint.longitude ===""){
                toast.error("Please enter longitude value of end point.")
                handleEvent("endLong", "focus")
            }
        }

    }

    // const handleDeleteStop = (index) => {
    //     let newRoute = {...route}
    //     let newStops = [...newRoute.stops]
    //     newStops.splice(index, 1)
    //     newRoute.stops = newStops
    //     setRoute(newRoute)
    // }

    const handleDoneStops = (stops) => {
        if(route.stops[stopEditIndex].name !== "" && route.stops[stopEditIndex].latitude !== "" && route.stops[stopEditIndex].longitude !== ""){
            setStopEditIndex(null)
        } else {
            if(route.stops[stopEditIndex].name === "" ){
                toast.error("Please add stop name.")
                handleEvent("stopName", "focus")
            } else if(route.stops[stopEditIndex].latitude === "" ){
                toast.error("Please add stop latitude value.")
                handleEvent("stopLatitude", "focus")
            } else if(route.stops[stopEditIndex].longitude === "" ){
                toast.error("Please add stop longitude value.")
                handleEvent("stopLongitude", "focus")
            }
        }
    }

    const handleAddStop = () => {
        let emptyStop = {
            id : route?.stops?.length + 1 || 1,
            name: "",
            latitude : "",
            longitude : ""
        }
        let newRoute = {...route}
        newRoute.stops = [...route.stops, emptyStop]
        setRoute(newRoute)
        handleEditStopIndex(newRoute.stops.length - 1)
    }

    const handleEditStopIndex = index => {
        setStopEditIndex(index)
    }

    const handleChangeStop = (e, i) => {
        let newRoute = {...route}
        let newStops = [...newRoute.stops]
        let currentStop = newStops[i]
        currentStop[e.target.name] = e.target.value
        newStops[i] = currentStop
        newRoute.stops = newStops
        setRoute(newRoute)
    }

    const handleDeleteStop = index => {
        let newRoute = {...route}
        let newStops = [...newRoute.stops]
        newStops.splice(index, 1)
        newRoute.stops = newStops
        setRoute(newRoute)

        handleDoneStops(newStops)
    }

    return (
        <div className='create_route'>
            <div className='inputrow_one'>
                <div className='each_item'>
                    <label>Route Name <span>*</span> </label>
                    {editable ? 
                        <input id="routeName" className='each_item_input' type="text" value={route.name} name="name" onChange={(e) => handleChange(e)} />
                    :
                        <div className='each_item_value'>{route.name} </div>
                    }
                </div>
                <div className='each_item'>
                    <label>Start Point  <span>*</span> </label>
                    {editable ? 
                        <div className='each_item_two_inputs'>
                            <div className='each_item_two_inputs_each' >
                                <label>Latitude :</label>
                                <input id="startLat" className='each_item_input' type="text" value={route.startPoint?.latitude} name="startPointlatitude" onChange={(e) => handleChange(e)} />
                            </div>
                            <div className='each_item_two_inputs_each' >
                                <label>Longitude :</label>
                                <input id="startLong" className='each_item_input' type="text" value={route.startPoint?.longitude} name="startPointlongitude" onChange={(e) => handleChange(e)} />
                            </div>
                        </div>
                    :
                        <div className='each_item_value'>({route.startPoint?.latitude}, {route.startPoint?.longitude}) </div>
                    }
                </div>
                <div className='each_item'>
                    <label>Destination Point  <span>*</span> </label>
                    {editable ? 
                        <div className='each_item_two_inputs'>
                            <div className='each_item_two_inputs_each' >
                                <label>Latitude :</label>
                                <input id="endLat" className='each_item_input' type="text" value={route.endPoint?.latitude} name="endPointlatitude" onChange={(e) => handleChange(e)} />
                            </div>
                            <div className='each_item_two_inputs_each' >
                                <label>Longitude :</label>
                                <input id="endLong" className='each_item_input' type="text" value={route.endPoint?.longitude} name="endPointlongitude" onChange={(e) => handleChange(e)} />
                            </div>
                        </div>
                    :
                        <div className='each_item_value'>({route.endPoint?.latitude}, {route.endPoint?.longitude}) </div>
                    }
                </div>
            </div>
            {/* <AddStops 
                stops={route.stops} 
                editable={editable} 
                editIndex={stopEditIndex}
                // handleDelete={handleDeleteStop}  
                handleDoneStops={handleDoneStops}
                handleEdit={handleEditStopIndex}
            /> */}
            <div className='stops_section'>
                <div className='stops_section_heading'>Stops Info</div>
                <div className='added_stops'>
                    {route?.stops?.length > 0 ? route?.stops?.map((stop, i) => {
                        return (
                            i === stopEditIndex ?
                                <div className='editing_stop_section'>
                                    <div className='editing_stop'>
                                        <div className='editing_stop_name'>
                                            <label>Name :</label>
                                            <input id="stopName" type="text" value={stop.name} onChange={(e) => handleChangeStop(e, i)} name="name" />
                                        </div>
                                        <div className='editing_stop_lat'>
                                            <label>Latitude :</label>
                                            <input id="stopLatitude" type="text" value={stop.latitude} onChange={(e) => handleChangeStop(e, i)} name="latitude" />
                                        </div>
                                        <div className='editing_stop_long'>
                                            <label>Longitude :</label>
                                            <input id="stopLongitude" type="text" value={stop.longitude} onChange={(e) => handleChangeStop(e, i)} name="longitude" />
                                        </div>
                                    </div>
                                    <Button label="Done" handleMe={() => handleDoneStops()} /> 
                                </div>
                            :   
                                <div className='each_added_stop'>
                                    <div className='stop_content_section'>
                                        <div className='each_added_stop_name'><span> Name: </span> {stop.name} </div>
                                        <div className='each_added_stop_lat'><span>Latitude :</span> {stop.latitude} </div>
                                        <div className='each_added_stop_long'><span>Longitude :</span> {stop.longitude} </div>
                                    </div>
                                    {editable &&
                                        <div className='stop_button_section'>
                                            <div className='edit_button' onClick={() => handleEditStopIndex(i)} >
                                                <FontAwesomeIcon icon={faPenToSquare} />
                                            </div>
                                            <div className='delete_button' onClick={() => handleDeleteStop(i)} >
                                                <FontAwesomeIcon icon={faCircleXmark} />
                                            </div>
                                        </div>
                                    }
                                </div>
                        )
                    })
                    :
                        !editable && <div className='noStopMessage'><span>No stops.</span></div>
                    }
                    {editable && stopEditIndex === null &&
                        <Button label="Add Stop" handleMe={handleAddStop} />
                    }
                </div>
             </div>
            <div className='create_routes_button_section'>
                {editable ?
                    <Button label={props.source === "create" ? "Add Route" : "Save Route"} handleMe={handleSave} />
                :
                    <Button label="Edit" handleMe={handleEdit} />
                }
                {props.source === "create" ?
                    null
                :
                    <Button label="Delete" handleMe={() =>  props.deleteRoute(props.routeIndex, "modal")} />}
                {props.source === "create" ?
                    null
                :
                    <Button label="View on Map" handleMe={handleViewMap} />
                }
            </div>
        </div>
    )
}

export default CreateRoute;