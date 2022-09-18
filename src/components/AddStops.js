import { faCircleXmark, faPenToSquare } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import Button from './Button';
import { handleEvent } from './helpingFunctions';


const AddStops = props => {
    const [stops, setStops] = useState([])

    useEffect(() => {
        if(props.stops){
            setStops(props.stops)
        }
    },[])

    const handleChange = (e, i) => {
        let newStops = [...stops]
        let currentStop = newStops[i]
        currentStop[e.target.name] = e.target.value
        newStops[i] = currentStop
        setStops(newStops)
    }

    const handleDoneStop = () => {
        if(stops[props.editIndex].name !== "" && stops[props.editIndex].latitude !== "" && stops[props.editIndex].longitude !== ""){
            props.handleDoneStops(stops)
        } else {
            if(stops[props.editIndex].name === "" ){
                toast.error("Please add stop name.")
                handleEvent("stopName", "focus")
            } else if(stops[props.editIndex].latitude === "" ){
                toast.error("Please add stop latitude value.")
                handleEvent("stopLatitude", "focus")
            } else if(stops[props.editIndex].longitude === "" ){
                toast.error("Please add stop longitude value.")
                handleEvent("stopLongitude", "focus")
            }
        }
    }

    const handleAddStop = () => {
        let emptyStop = {
            id : stops.length + 1,
            name: "",
            latitude : "",
            longitude : ""
        }
        setStops([...stops, emptyStop])
        props.handleEdit(stops.length)
    }

    const handleDelete = index => {
        let newStops = [...stops]
        newStops.splice(index, 1)
        setStops(newStops)
        props.handleDoneStops(newStops)
    }

    return (
        <div className='stops_section'>
            <div className='stops_section_heading'>Stops Info</div>
            <div className='added_stops'>
                {stops?.length > 0 ? stops?.map((stop, i) => {
                    return (
                        i === props.editIndex ?
                            <div className='editing_stop_section'>
                                <div className='editing_stop'>
                                    <div className='editing_stop_name'>
                                        <label>Name :</label>
                                        <input id="stopName" type="text" value={stop.name} onChange={(e) => handleChange(e, i)} name="name" />
                                    </div>
                                    <div className='editing_stop_lat'>
                                        <label>Latitude :</label>
                                        <input id="stopLatitude" type="text" value={stop.latitude} onChange={(e) => handleChange(e, i)} name="latitude" />
                                    </div>
                                    <div className='editing_stop_long'>
                                        <label>Longitude :</label>
                                        <input id="stopLongitude" type="text" value={stop.longitude} onChange={(e) => handleChange(e, i)} name="longitude" />
                                    </div>
                                </div>
                                <Button label="Done" handleMe={() => handleDoneStop()} /> 
                            </div>
                        :   
                            <div className='each_added_stop'>
                                <div className='stop_content_section'>
                                    <div className='each_added_stop_name'><span> Name: </span> {stop.name} </div>
                                    <div className='each_added_stop_lat'><span>Latitude :</span> {stop.latitude} </div>
                                    <div className='each_added_stop_long'><span>Longitude :</span> {stop.longitude} </div>
                                </div>
                                {props.editable &&
                                    <div className='stop_button_section'>
                                        <div className='edit_button' onClick={() => props.handleEdit(i)} >
                                            <FontAwesomeIcon icon={faPenToSquare} />
                                        </div>
                                        <div className='delete_button' onClick={() => handleDelete(i)} >
                                            <FontAwesomeIcon icon={faCircleXmark} />
                                        </div>
                                    </div>
                                }
                            </div>
                    )
                })
                :
                    !props.editable && <div className='noStopMessage'><span>No stops.</span></div>
                }
                {props.editable && props.editIndex === null &&
                    <Button label="Add Stop" handleMe={handleAddStop} />
                }
                
            </div>
        </div>
    )
}

export default AddStops;