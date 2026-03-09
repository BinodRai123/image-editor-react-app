import { useRef, useState } from "react";
import "./CanvasSketchPaint.css";
import PaintingArea from "./PaintArea/PaintArea";
import PaintNavbar from "./paintAreaNavbar/PaintNavbar";

const CanvasSketchPaint = () => {
   const canvasRef = useRef(null);

   // Shared State
   const [brushWidth, setBrushWidth] = useState(10);
   const [eraserWidth, setEraserWidth] = useState(10);
   const [isEraser, setIsEraser] = useState(false);
   const [strokeColor, setStrokeColor] = useState("#221a10");
   const [canvasColor, setCanvasColor] = useState("#ffffff");

   const handleExport = async () => {
      const image = await canvasRef.current.exportImage("png");
      const link = document.createElement("a");
      link.href = image;
      link.download = "paint-canvas.png";
      link.click();
   };

   return (
      <div className="canvas-main-container">
         <PaintingArea
            canvasRef={canvasRef}
            brushWidth={brushWidth}
            eraserWidth={eraserWidth}
            isEraser={isEraser}
            strokeColor={strokeColor}
            canvasColor={canvasColor}
         />
         <PaintNavbar
            canvasRef={canvasRef}
            brushWidth={brushWidth}
            setBrushWidth={setBrushWidth}
            eraserWidth={eraserWidth}
            setEraserWidth={setEraserWidth}
            isEraser={isEraser}
            setIsEraser={setIsEraser}
            onExport={handleExport}
            setStrokeColor={setStrokeColor}
            strokeColor={strokeColor}
            setCanvasColor={setCanvasColor}
            canvasColor={canvasColor}
         />
      </div>
   );
};

export default CanvasSketchPaint;
