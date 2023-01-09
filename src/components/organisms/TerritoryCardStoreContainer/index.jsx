import React from "react";
import Card from "../../atoms/Card";

const TerritoryCardStoreContainer = ({ className, children }) => {
    return (
        <Card className={`w-[calc(100%-1rem)] h-[calc(100%-3rem)] mx-auto mt-2 bg-cyan-600 rounded ${className}`}>
            {children}
        </Card>
    );
};

export default TerritoryCardStoreContainer;
