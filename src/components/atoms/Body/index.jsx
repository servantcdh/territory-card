import React from "react";

const Body = (props) => {
    return (
        <div className={`w-screen h-screen ${props.className}`}>
            {props.children}
        </div>
    );
};

export default Body;