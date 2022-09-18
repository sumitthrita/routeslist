import { faXmark } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import React from 'react';
import { TransitionGroup } from 'react-transition-group';
import Button from './Button';

const Modal = props => {

    const handleClose = () => {
        props.handleClose()
    }

    return (
        <TransitionGroup
            transitionName="modalOverlay"
            transitionAppear={true}
            transitionEnter={false}
            transitionLeave={false}>
            <div className={props.show ? "modal display-block" : "modal display-none"} onClick={handleClose}>
                <TransitionGroup
                    transitionName="modalMain"
                    transitionAppear={true}
                    transitionEnter={false}
                    transitionLeave={false}>
                    <div className={`modal-main ${props.title} ${props.className || ""}`} onClick={props.remainClose}>
                        {props.title !== undefined && (props.title !== null ? 
                            <div className="modal-head" > 
                                <h3>{props.titleIcon ? props.titleIcon : props.title}</h3> 
                            </div>
                        :
                             ""
                        )}
                        <div className="modal-body">{props.children}</div>
                        <div className="btn-close" onClick={handleClose}>
                            <FontAwesomeIcon icon={faXmark} />
                            {/* <svg xmlns="http://www.w3.org/2000/svg" fill="#888" width="25" height="25" viewBox="0 0 512.001 512"><g transform="translate(0 -0.001)"><path d="M284.286,256,506.143,34.144A20,20,0,0,0,477.858,5.859L256,227.717,34.143,5.859A20,20,0,0,0,5.858,34.144L227.715,256,5.858,477.859a20,20,0,0,0,28.286,28.285L256,284.287,477.857,506.144a20,20,0,0,0,28.286-28.285Z" /></g></svg> */}
                        </div>
                    </div>
                </TransitionGroup>
            </div>
        </TransitionGroup>
    );
}

export default Modal;