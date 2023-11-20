import React from "react";
import { Link } from "react-router-dom";

const FirstRowLinks = ({ to, children}) => {
    return (
        <>
            <Link to={to} className="flex items-center justify-center">
                {children}
            </Link>
        </>
    );
};

export default FirstRowLinks;
