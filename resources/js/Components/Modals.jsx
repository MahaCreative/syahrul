import { Transition } from "@headlessui/react";
import React, { Fragment } from "react";

export default function Modals({ open, setOpen, children }) {
    return (
        <Transition show={open} as={Fragment}>
            <div>{children}</div>
        </Transition>
    );
}
