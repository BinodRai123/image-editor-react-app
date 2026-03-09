import { ReactSketchCanvas } from "react-sketch-canvas";
import "./PaintingArea.css";

const PaintingArea = ({ canvasRef, brushWidth, eraserWidth, isEraser, strokeColor, canvasColor }) => {
   return (
      <section className="painting-viewport">
         <div className="canvas-elevation-wrapper" style={{ backgroundColor: canvasColor }}>
            <ReactSketchCanvas
               ref={canvasRef}
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
