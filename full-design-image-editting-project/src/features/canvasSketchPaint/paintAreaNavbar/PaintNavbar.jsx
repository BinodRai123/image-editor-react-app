import { useRef, useState } from "react";

// Icons
import MenuBarButton from "../../../components/menuIcon/menuIcon";
import CanvasPaintBrush from "../../../components/icons/CanvasPaintBrush";
import EraserIcon from "../../../components/icons/EraserIcon";
import UndoIcon from "../../../components/icons/UndoIcon";
import RedoIcon from "../../../components/icons/RedoIcon";
import ResetIcon from "../../../components/icons/ResetIcon";
import DownloadIcon from "../../../components/icons/DownloadIcon";

//PAINTNAVBAR CSS//
import "./PaintNavbar.css";

//MAX-PREVIWE OF IMAGE
const MAX_PREVIEW_SIZE = 1200;

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
   setImage,
}) => {
   const [isOpen, setIsOpen] = useState(false);
   const fileInputRef = useRef(null);

   /* ---- Toogle Tool(BRUSH / ERAISER) ---- */
   const handleToolChange = (mode) => {
      setIsEraser(mode);
      canvasRef.current.eraseMode(mode);
   };

   /* ---- toggle sidebar ---- */
   const toggleSidebar = () => {
      setIsOpen(!isOpen);
   };

   /* ---------- handle image upload ---------- */
   const handleImageUpload = (event) => {
      const file = event.target.files[0];
      if (file && file.type.startsWith("image/")) {
         //create new img and store url
         const img = document.createElement("img");
         img.src = URL.createObjectURL(file);

         img.onload = () => {
            let width = img.width;
            let height = img.height;

            if (width > MAX_PREVIEW_SIZE || height > MAX_PREVIEW_SIZE) {
               const ratio = Math.min(MAX_PREVIEW_SIZE / width, MAX_PREVIEW_SIZE / height);
               width *= ratio;
               height *= ratio;
            }

            img.width = width;
            img.height = height;

            setImage(img.src);
            img.remove();
         };
      }
   };

   /* -------- Trigger File to open When Click on Add Backgorund Image -------- */
   const triggerFileSelect = () => {
      fileInputRef.current.click();
   };

   return (
      <>
         {/* ---- Menubar Icon ----- */}
         <MenuBarButton toggleSidebar={toggleSidebar} isOpen={isOpen} />

         {/* ----- Paint SideBar  ----- */}
         <aside className={`paint-sidebar ${isOpen ? "paint-sidebar-open" : ""}`}>
            <section className="paint-sidebar-content">
               {/* Brush and Erasier Tool Section */}
               <section className="nav-section">
                  <h4 className="nav-title">TOOL SELECTION</h4>
                  <div className="tool-toggle-row">
                     {/* Brush Button */}
                     <button
                        className={`tool-box ${!isEraser ? "active" : ""}`}
                        onClick={() => handleToolChange(false)}
                     >
                        <div className="icon-slot brush-icon"></div>
                        <CanvasPaintBrush size="40px" color={!isEraser && "orange"} />
                     </button>
                     {/* Eraiser Button */}
                     <button
                        className={`tool-box ${isEraser ? "active" : ""}`}
                        onClick={() => handleToolChange(true)}
                     >
                        <div className="icon-slot eraser-icon"></div>
                        <EraserIcon size="40px" color={isEraser && "orange"} />
                     </button>
                  </div>
               </section>

               {/* Stroke and BG Color */}
               <section className="nav-section">
                  <h4 className="nav-title">APPEARANCE</h4>
                  <div className="color-grid">
                     <div className="color-input-wrapper">
                        <label>Stroke</label>
                        <input
                           type="color"
                           value={strokeColor}
                           onChange={(e) => setStrokeColor(e.target.value)}
                        />
                     </div>
                     <div className="color-input-wrapper">
                        <label>Background</label>
                        <input
                           type="color"
                           value={canvasColor}
                           onChange={(e) => setCanvasColor(e.target.value)}
                        />
                     </div>
                  </div>
               </section>

               {/* Width of Stroke and Erasier */}
               <section className="nav-section">
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
               </section>

               {/* Upload BG Image */}
               <section className="nav-section">
                  <h4 className="nav-title">MEDIA</h4>
                  {/* Hidden Input */}
                  <input
                     type="file"
                     ref={fileInputRef}
                     style={{ display: "none" }}
                     accept="image/*"
                     onChange={handleImageUpload}
                  />
                  {/* Clickable Dropzone */}
                  <div className="media-dropzone" onClick={triggerFileSelect} style={{ cursor: "pointer" }}>
                     <div className="icon-slot media-icon"></div>
                     <p>Add Background Photo</p>
                  </div>
               </section>
            </section>

            {/* History (Redo/Undo) , Reset and Export Image */}
            <section className="nav-actions">
               <div className="history-btns">
                  {/* Undo Button */}
                  <button onClick={() => canvasRef.current.undo()}>
                     <UndoIcon />
                  </button>
                  <button onClick={() => canvasRef.current.redo()}>
                     {/* Redo Button */}
                     <RedoIcon />
                  </button>
                  <button className="span-2" onClick={() => canvasRef.current.clearCanvas()}>
                     {/* Reset Button */}
                     <ResetIcon />
                  </button>
               </div>
               <button className="export-trigger" onClick={onExport}>
                  <DownloadIcon /> Export Image
               </button>
               <span className="timestamp">Paint Everything you like.</span>
            </section>
         </aside>
      </>
   );
};

export default PaintNavbar;
