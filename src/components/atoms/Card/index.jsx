import React from "react";

const Card = (props) => {
    const className = "p-5 bg-amber-200 " + props.className;
    return (
        <div className={className}>
            {props.children}
        </div>
    );
};

export default Card;
