import React from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";

const Header = () => {
    return (
        <div className="header sticky top-0 z-10 text-3xl flex justify-between items-center text-red-500 font-bold p-3 border-b-2 border-gray-500">
            <Link to={"/filmyduniya"}>
                <span>
                    Filmy<span className="text-white italic">Duniya</span>
                </span>
            </Link>
            <Link to={"/addmovie"}>
                <h1 className="text-lg text-white cursor-pointer flex items-center">
                    <Button>
                        <AddIcon className="mr-1" color="inherit" />
                        <span className="text-white">Add New</span>
                    </Button>
                </h1>
            </Link>
        </div>
    );
};

export default Header;
