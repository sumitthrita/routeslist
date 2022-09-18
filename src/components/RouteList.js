import { faMapLocationDot, faPenToSquare, faSearch, faTrash } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { deleteRoute, showGeneralModalAction } from '../Redux/action';
import CreateRoute from './CreateRoute';
import ViewMap from './ViewMap';

const RouteList = props => {

    const [searchString, setSearchString] = useState("");
    const [routesToShow, setRoutesToShow] = useState([]) 
    const [prevRoutes, setPrevRoutes] = useState([])

    const { routeslist } = useSelector(state => ({
        routeslist : state.routeReducer.routes
    }))

    const dispatch = useDispatch()

    const header = ["Name", "Start", "Destination", "No. of Stops", "View on Map", "Edit", "Delete"]

    const handleInput = value => {
        setSearchString(value);
    }

    useEffect(() => {
        if(routeslist) {
            setRoutesToShow(JSON.parse(routeslist))
            setPrevRoutes(JSON.parse(routeslist))
        }
    },[routeslist])

    const handleCreateRouteModal = () => {
        let component = <CreateRoute source="create" editable={true} />
        const toSend = {
            component, 
            title: "Create Route",
            showModal: true,
            handleClose: closeModal
          }
        dispatch(showGeneralModalAction(toSend))
    }

    const openRouteInfo = (route, routeIndex, type) => {
        let component = type === "edit" ? <CreateRoute deleteRoute={deleteRouteInfo} routeIndex={routeIndex} route={route} source="update" editable={true} /> :  <CreateRoute deleteRoute={deleteRouteInfo} route={route} source="update" />
        const toSend = {
            component, 
            title: "Route Info",
            showModal: true,
            handleClose: closeModal
          }
        dispatch(showGeneralModalAction(toSend))
    }

    const viewMap = (route) => {
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

    const deleteRouteInfo = (index, source) => {
        dispatch(deleteRoute(index, source))
    }


    return (
        <div className='routelist'>
            {routesToShow?.length > 0 && <div className='searchbar'>
                <FontAwesomeIcon icon={faSearch} />
                <input
                    type="text"
                    placeholder="Search for route name"
                    value = {searchString}
                    onChange={(e) => handleInput(e.target.value)}
                />
            </div>}
            {routesToShow?.length > 0 ? 
                <div className='routelist_box'>
                    <div className='routelist_header'>
                        {header.map( (e, i) => 
                            <div className={`header_row_each each_row_${i}`} key={i}>{e}</div>
                        )}
                    </div>
                    <div className='routelist_mainlist'>
                        {routesToShow?.map((e,i) => 
                            <div key={e.id} className='routelist_mainlist_each_row'>
                                <div className='routelist_each_row_item each_row_0' onClick={() => openRouteInfo(e, i, "check")} >{e.name} </div>
                                <div className='routelist_each_row_item each_row_1'>({e.startPoint.latitude}, {e.startPoint.longitude}) </div>
                                <div className='routelist_each_row_item each_row_2'>({e.endPoint.latitude}, {e.endPoint.longitude}) </div>
                                <div className='routelist_each_row_item each_row_3'>{e.stops.length} </div>
                                <div className='routelist_each_row_item each_row_4' onClick={() => viewMap(e, i)} ><FontAwesomeIcon icon={faMapLocationDot} /> </div>
                                <div className='routelist_each_row_item each_row_5' onClick={() => openRouteInfo(e, i, "edit")} ><FontAwesomeIcon icon={faPenToSquare} /> </div>
                                <div className='routelist_each_row_item each_row_6' onClick={() => deleteRouteInfo(i)} ><FontAwesomeIcon icon={faTrash} /> </div>
                            </div>
                        )}
                    </div>
                </div>
            :
                <div className='no_list_message'>There are no Routes to show. Please click to <span onClick={handleCreateRouteModal} >Add Route</span> to add route.</div>
            }
        </div>
    )
}

export default RouteList;