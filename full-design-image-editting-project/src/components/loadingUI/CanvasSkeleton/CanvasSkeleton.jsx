import React from "react";
import "./CanvasSkeletonStyle.css";

const CanvasSkeleton = ({ message }) => {
   return (
      <div className="loader-container">
         <div className="canvas-spinner">
            <div className="spinner-ring"></div>
            <div className="spinner-core"></div>
         </div>
         <p className="loader-text">{message}</p>
      </div>
   );
};

export default CanvasSkeleton;
