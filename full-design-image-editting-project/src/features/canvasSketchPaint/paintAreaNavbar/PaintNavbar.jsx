import "./PaintNavbar.css";

const PaintNavbar = ({
   canvasRef,
   brushWidth,
   setBrushWidth,
   eraserWidth,
   setEraserWidth,
   isEraser,
   setIsEraser,
   strokeColor,
   setStrokeColor,
   canvasColor,
   setCanvasColor,
   onExport,
}) => {
   const handleToolChange = (mode) => {
      setIsEraser(mode);
      canvasRef.current.eraseMode(mode);
   };

   return (
      <aside className="paint-sidebar">
         {/* Brush and Erasier Tool Section */}
         <div className="nav-section">
            <h4 className="nav-title">TOOL SELECTION</h4>
            <div className="tool-toggle-row">
               <button
                  className={`tool-box ${!isEraser ? "active" : ""}`}
                  onClick={() => handleToolChange(false)}
               >
                  <div className="icon-slot brush-icon"></div>
                  <span>Brush</span>
               </button>
               <button
                  className={`tool-box ${isEraser ? "active" : ""}`}
                  onClick={() => handleToolChange(true)}
               >
                  <div className="icon-slot eraser-icon"></div>
                  <span>Eraser</span>
               </button>
            </div>
         </div>

         {/* Stroke and BG Color */}
         <div className="nav-section">
            <h4 className="nav-title">APPEARANCE</h4>
            <div className="color-grid">
               <div className="color-input-wrapper">
                  <label>Stroke</label>
                  <input type="color" value={strokeColor} onChange={(e) => setStrokeColor(e.target.value)} />
               </div>
               <div className="color-input-wrapper">
                  <label>Background</label>
                  <input type="color" value={canvasColor} onChange={(e) => setCanvasColor(e.target.value)} />
               </div>
            </div>
         </div>

         {/* Width of Stroke and Erasier */}
         <div className="nav-section">
            <h4 className="nav-title">ADJUSTMENTS</h4>
            <div className="range-group">
               <div className="range-info">
                  <label>Brush Stroke</label>
                  <span className="accent-text">{brushWidth}px</span>
               </div>
               <input
                  type="range"
                  min="1"
                  max="100"
                  value={brushWidth}
                  onChange={(e) => setBrushWidth(parseInt(e.target.value))}
               />
            </div>
            <div className="range-group">
               <div className="range-info">
                  <label>Eraser Stroke</label>
                  <span className="accent-text">{eraserWidth}px</span>
               </div>
               <input
                  type="range"
                  min="1"
                  max="100"
                  value={eraserWidth}
                  onChange={(e) => setEraserWidth(parseInt(e.target.value))}
               />
            </div>
         </div>

         {/* Upload BG Image */}
         <div className="nav-section">
            <h4 className="nav-title">MEDIA</h4>
            <div className="media-dropzone">
               <div className="icon-slot media-icon"></div>
               <p>Add Background Photo</p>
            </div>
         </div>

         {/* History (Redo/Undo) , Reset and Export Image */}
         <div className="nav-actions">
            <div className="history-btns">
               <button onClick={() => canvasRef.current.undo()}>Undo</button>
               <button onClick={() => canvasRef.current.redo()}>Redo</button>
               <button onClick={() => canvasRef.current.clearCanvas()}>Reset</button>
            </div>
            <button className="export-trigger" onClick={onExport}>
               Export Image
            </button>
            <span className="timestamp">Auto saved 2 mins ago</span>
         </div>
      </aside>
   );
};

export default PaintNavbar;
