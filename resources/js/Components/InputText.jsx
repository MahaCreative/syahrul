import { InputLabel, TextField } from "@mui/material";
import React from "react";

export default function InputText({ name, title, label, errors, ...props }) {
    return (
        <div>
            {label && <InputLabel id={name}>{label}</InputLabel>}
            <TextField
                {...props}
                error={errors ? true : false}
                id={name}
                name={name}
                label={title}
                helperText={errors && errors}
            />
        </div>
    );
}
