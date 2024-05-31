import { Link } from "@inertiajs/react";
import React from "react";

export default function MenuLink({ children, link, active, title, ...props }) {
    return (
        <Link
            href={link}
            className={`${
                active ? "bg-orange-500" : ""
            } hover cursor-pointer font-oswald font-normal text-xs md:text-base lg:text-xl  text-white rounded-md hover:bg-orange-500 py-2 px-3 duration-300 ease-in-out transition-all`}
        >
            {title}
        </Link>
    );
}
