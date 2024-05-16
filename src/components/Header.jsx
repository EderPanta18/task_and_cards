import React from "react";

const Header = ({ title, count }) => {
    return (
        <div className="flex items-center font-bold tracking-tighter justify-between -mb-1 -mt-1">
            <h2 className="text-2xl">{title}</h2>
            <div className="text-4xl border-2 border-green-400 rounded-full px-3">
                <p>{count}</p>
            </div>
        </div>
    );
};

export default Header