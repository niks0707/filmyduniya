import React, { useContext } from "react";
import AddIcon from "@mui/icons-material/Add";
import { Button } from "@mui/material";
import { Link } from "react-router-dom";
import { Appstate } from "../App";

const Header = () => {
    const useAppstate = useContext(Appstate)

    return (
        <div className="header sticky top-0 z-10 text-3xl flex justify-between items-center text-red-500 font-bold p-3 border-b-2 border-gray-500">
            <Link to={"/filmyduniya"}>
                <span>
                    Filmy<span className="text-white italic">Duniya</span>
                </span>
            </Link>
            {
                useAppstate.login ?
                    <Link to={"/addmovie"}>
                        <h1 className="text-lg text-white cursor-pointer flex items-center">
                            <Button>
                                <AddIcon className="mr-1" color="inherit" />
                                <span className="text-white">Add New</span>
                            </Button>
                        </h1>
                    </Link>
                    :
                    <Link to={"/login"}>
                        <Button>
                            <h1 className="text-lg text-white cursor-pointer flex items-center bg-green-500">
                                <span className="text-white font-medium capitalize p-2">Login</span>
                            </h1>
                        </Button>
                    </Link>

            }
        </div>
    );
};

export default Header;
