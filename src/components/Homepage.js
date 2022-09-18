import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { showGeneralModalAction } from '../Redux/action';
import Header from './Header';
import Modal from './Modal';
import RouteList from './RouteList';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Homepage = props => {

    const {showGeneralModal} = useSelector(state => ({
        showGeneralModal : state.routeReducer.showGeneralModal
    }))

    const dispatch = useDispatch()

    const closeModal = () => {
        const toSend = {
          showModal: false
        }
        dispatch(showGeneralModalAction(toSend))
    }

    const remainModal = (event) => {
        event.stopPropagation();
    }

    return (
        <div className='homepage'>
            <Header />
            <RouteList />
            {showGeneralModal.showModal &&
                <div className="modal-wrapper">
                    <Modal
                        handleClose={closeModal}
                        remainClose={remainModal}
                        show={showGeneralModal.showModal}
                        title={showGeneralModal.title}
                        titleIcon={showGeneralModal.titleIcon}
                        className={showGeneralModal.class}
                        handleSkip={showGeneralModal.handleSkip}
                        overLayClickable={showGeneralModal.overLayClickable}
                    >
                        {showGeneralModal.component}
                    </Modal>
                </div>
            }
            <ToastContainer
                position="bottom-right"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnVisibilityChange
                draggable
                pauseOnHover
            />
        </div>
    )
}

export default Homepage;