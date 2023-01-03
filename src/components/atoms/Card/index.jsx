import React from "react";

const Card = (props) => {
    const className = `container p-5 bg-amber-200 font-display ${props.className}`;
    return (
        <div className={className}>
            {props.children}
        </div>
    );
};

export default Card;
