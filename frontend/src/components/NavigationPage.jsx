import React from "react";
import { NavLink } from "react-router-dom";

const NavigationPage = ({ to, icon, label }) => {
    return (
        <div>
            <div className="font-medium border-t-2 border-x-2 p-3 hover:bg-[#f3f3f3]">
                <NavLink to={to}>
                    <p className="flex gap-2 items-center">
                        {icon}
                        {label}
                    </p>
                </NavLink>
            </div>
        </div>
    );
};

export default NavigationPage;
