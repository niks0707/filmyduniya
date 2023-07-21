import React, { useState } from "react";
import ReactPlayer from "react-player/youtube";
import "./style.css";

const VideoPopup = ({ show, setShow, trailerurl }) => {
    const [play, setPlay] = useState(true);

    const hidePopup = () => {
        setShow(false);
        setPlay(false);
    };
    return (
        <div className={`videoPopup ${show ? "visible" : ""}`}>
            <div className="opacityLayer" onClick={hidePopup}></div>
            <div className="videoPlayer">
                <span className="closeBtn" onClick={hidePopup}>
                    Close
                </span>
                <ReactPlayer
                    url={trailerurl}
                    controls
                    width="100%"
                    height="100%"
                    playing={play && show}
                />
            </div>
        </div>
    );
};

export default VideoPopup;