import { ReactSketchCanvas } from "react-sketch-canvas";
import "./PaintingArea.css";

const PaintingArea = ({ canvasRef, brushWidth, eraserWidth, isEraser, strokeColor, canvasColor }) => {
   return (
      <section className="painting-viewport">
         <div className="canvas-elevation-wrapper" style={{ backgroundColor: canvasColor }}>
            <ReactSketchCanvas
               ref={canvasRef}
               width="100%"
               height="100%"
               style={{
                  display: "block",
                  width: "100%",
                  height: "100%",
               }}
               strokeWidth={brushWidth}
               eraserWidth={eraserWidth}
               strokeColor={strokeColor}
               canvasColor="transparent"
            />
         </div>
      </section>
   );
};

export default PaintingArea;
