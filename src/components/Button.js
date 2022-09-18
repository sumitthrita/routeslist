import React from "react";

const Button = (props) => {
    const className = props.className ? props.className : ""
    return(
    <div className={`btn-wrapper ${className}`}>
        <button
            className={`btn-default ${props.type}`} onClick={props.handleMe} id={props.id} disabled={props.disabled} >{props.icon}{props.label}
        </button>
    </div>
)};

export default Button;