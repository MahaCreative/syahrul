import { Favorite, FavoriteBorder } from "@mui/icons-material";
import { Rating, colors, styled } from "@mui/material";
import React from "react";
const Styled = styled(Rating)({
    "& .MuiRating-iconFilled": {
        color: "red",
    },
    "& .MuiRating-iconHover": {
        color: "orange",
    },
});
export default function StyledRating({ ...props }) {
    return (
        <div>
            <Styled
                {...props}
                icon={<Favorite fontSize="large" color="inherit" />}
                emptyIcon={
                    <div className="text-white">
                        <FavoriteBorder fontSize="large" color="inherit" />
                    </div>
                }
            />
        </div>
    );
}
