import { faPlusCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react'
import { useDispatch } from 'react-redux';
import { showGeneralModalAction } from '../Redux/action';
import CreateRoute from './CreateRoute';

const Header = props => {
    const dispatch = useDispatch()

    const openCreateRoute = e => {
        let component = <CreateRoute source="create" editable={true} />
        const toSend = {
            component, 
            title: "Create Route",
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

    return (
        <div className='header'>
            <div className='title_project'>Chalo</div>
            <div className='create_button' onClick={openCreateRoute}>
                <FontAwesomeIcon icon={faPlusCircle} />
                <div className='create_button_text'>Create Route</div>
            </div>
        </div>
    )
}

export default Header;