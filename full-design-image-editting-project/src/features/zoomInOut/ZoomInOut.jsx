import React from "react";
import { TransformWrapper, TransformComponent, useControls } from "react-zoom-pan-pinch";
import "./ZoomInOut.css";
import src from "../beforeAfterImage/images/before-image.jpg";

// Separate component for the buttons to use the internal library hooks
const Controls = () => {
   const { zoomIn, zoomOut, resetTransform } = useControls();
   return (
      <div className="tools">
         <button onClick={() => zoomIn()}>Zoom In (+)</button>
         <button onClick={() => zoomOut()}>Zoom Out (-)</button>
         <button onClick={() => resetTransform()}>Reset</button>
      </div>
   );
};

const ZoomInOut = () => {
   return (
      <div className="editor-container">
         <TransformWrapper
            initialScale={1}
            minScale={0.1} // 1. Set this very low (0.1 = 10% of original size)
            maxScale={10} // 2. High enough to see pixels
            limitToBounds={false} // 3. CRUCIAL: Allows image to be smaller than the box
            centerZoomedOut={true} // 4. Keeps the image in the middle when tiny
         >
            <TransformComponent wrapperStyle={{ width: "100%", height: "100%" }}>
               <img src={src} alt="Editor" style={{ width: "100%" }} />
            </TransformComponent>
         </TransformWrapper>
      </div>
   );
};

export default ZoomInOut;
