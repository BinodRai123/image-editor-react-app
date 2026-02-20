import { useCropShape } from "../../hooks/useCropShape";
import { useCropPreview } from "../../hooks/useCropPreview";
import { useState, useRef, useEffect, useCallback } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";
import "./cropSection.css";

const imageUrl =
   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFYqoKTu_o3Zns2yExbst2Co84Gpc2Q1RJbA&s";

const CropSection = () => {
   const [crop, setCrop] = useState({
      unit: "%",
      x: 25,
      y: 25,
      width: 50,
      height: 50,
   });

   // State to handle the shape toggle
   const [isCircle, setIsCircle] = useState(false);

   const { showPreview, imgRef, previewCanvasRef } = useCropPreview(isCircle);

   const { handleCropChange, toggleShape } = useCropShape({ showPreview, setCrop, setIsCircle, crop });

   const handleDownloadCrop = () => {
      if (!previewCanvasRef || !imgRef) return;

      const base64 = previewCanvasRef.current.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "crop image";
      link.href = base64;
      link.click();
   };

   return (
      <div className="editor-container">
         {/* Main Workspace */}

         <main className="editor-main">
            <div class="bg-checkerboard"></div>
            <ReactCrop
               crop={crop}
               onChange={handleCropChange}
               circularCrop={isCircle}
               className="canvas-area"
            >
               <img ref={imgRef} src={imageUrl} alt="Workspace" />
            </ReactCrop>
         </main>

         {/* Sidebar Controls */}
         <aside className="editor-sidebar">
            <section className="sidebar-section">
               <h4 className="section-title">LIVE PREVIEW</h4>
               <div className="live-preview-box">
                  <div className="preview-placeholder flex-center">
                     <canvas
                        ref={previewCanvasRef}
                        style={{
                           border: "2px solid #333",
                           // THE MAGIC LINE: Toggle radius based on state
                           borderRadius: isCircle ? "50%" : "0px",
                           maxWidth: "300px",
                           maxHeight: "300px",
                           transition: "border-radius 0.3s ease", // Smooth transition
                           background: "#f0f0f0",
                        }}
                     />
                     {/* {imageUrl ? (
                        
                     ) : (
                        <span>
                           CROP PREVIEW
                           <br />
                           GOES HERE
                        </span>
                     )} */}
                     <span className="resolution-tag">1920 x 1080</span>
                  </div>
               </div>
            </section>

            <section className="sidebar-section">
               <h4 className="section-title">ASPECT RATIO</h4>
               <div className="ratio-grid">
                  <button className="ratio-btn active">1:1</button>
                  <button className="ratio-btn">16:9</button>
                  <button className="ratio-btn">4:5</button>
                  <button className="ratio-btn">Free</button>
               </div>
            </section>

            <div className="sidebar-footer">
               <button className="download-btn">
                  <span className="icon">↓</span> Download Final Crop
               </button>
               <p className="export-hint">Export as PNG, 300 DPI (High Quality)</p>
            </div>
         </aside>
      </div>
   );
};

export default CropSection;
