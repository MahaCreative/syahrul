import { Link } from "@inertiajs/react";
import React from "react";

export default function MenuAdmin({ icon, title, active, ...props }) {
    return (
        <Link
            {...props}
            className={`${
                active ? "bg-orange-500" : ""
            } w-full flex items-center gap-3 font-medium text-sm text-white px-8 py-1 my-1  hover:bg-orange-500 transition-all duration-300 ease-in-out`}
        >
            <p>{icon}</p>
            <p>{title}</p>
        </Link>
    );
}
