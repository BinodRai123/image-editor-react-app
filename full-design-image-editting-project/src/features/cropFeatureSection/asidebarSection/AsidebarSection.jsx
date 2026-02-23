import DownloadIcon from "../../../components/icons/DownloadIcon";
import MenuBarButton from "../../../components/menuIcon/menuIcon";
import React, { useCallback, useState } from "react";
import "./asidebarStyle.css";

const AsidebarSection = ({ crop, setCrop, image, previewCanvasRef, isCircle }) => {
   const [activeRatio, setActiveRatio] = useState("1:1");
   const [isOpen, setIsOpen] = useState(false);

   const ASPECT_RATIOS = [
      { label: "1:1", value: 1 / 1 },
      { label: "16:9", value: 16 / 9 },
      { label: "4:5", value: 4 / 5 },
      { label: "Free", value: undefined }, // undefined allows free-form dragging
   ];

   /* ---- toggle sidebar ---- */
   const toggleSidebar = () => {
      setIsOpen(!isOpen);
   };

   //handle active aspect ratio btn
   const handleActiveRatioBtn = useCallback(
      (ratio) => {
         setActiveRatio(ratio.label);

         if (!ratio.value) {
            // Handle "Free" mode: we keep the current crop but remove aspect constraints
            setCrop({ ...crop, aspect: undefined });
            return;
         }

         const newHeight = crop.width / ratio.value;

         setCrop({
            ...crop,
            aspect: ratio.value,
            height: newHeight,
         });
      },
      [crop],
   );

   //Download image as per the preview
   const handleDownloadCrop = () => {
      if (!previewCanvasRef.current || !image) return;

      const base64 = previewCanvasRef.current.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "crop image";
      link.href = base64;
      link.click();
   };

   return (
      <>
         {/* MenuBar */}
         <MenuBarButton toggleSidebar={toggleSidebar} isOpen={isOpen} />

         <aside className={`crop-editor-sidebar ${isOpen && "crop-editor-sidebar-open"}`}>
            <section className="sidebar-section">
               <h4 className="section-title">LIVE PREVIEW</h4>
               <div className="live-preview-box">
                  <div className="preview-placeholder flex-center">
                     {image ? (
                        <canvas
                           ref={previewCanvasRef}
                           style={{
                              border: "2px solid #333",
                              borderRadius: isCircle ? "50%" : "0px",
                              transition: "border-radius 0.3s ease", // Smooth transition
                              background: "#f0f0f0",
                           }}
                        />
                     ) : (
                        <span>
                           CROP PREVIEW
                           <br />
                           GOES HERE
                        </span>
                     )}
                     <span className="resolution-tag">1920 x 1080</span>
                  </div>
               </div>
            </section>

            <section className="sidebar-section">
               <h4 className="section-title">ASPECT RATIO</h4>
               <div className="ratio-grid">
                  {ASPECT_RATIOS.map((objectRatio, id) => {
                     return (
                        <AspectRatioBtn
                           key={id}
                           id={id}
                           objectRatio={objectRatio}
                           isActive={objectRatio.label === activeRatio} //True or False
                           handleActiveRatioBtn={handleActiveRatioBtn}
                        />
                     );
                  })}
               </div>
            </section>

            <div className="sidebar-footer">
               <button onClick={handleDownloadCrop} className="download-btn">
                  <DownloadIcon /> Download Final Crop
               </button>
               <p className="export-hint">Export as PNG, 300 DPI (High Quality)</p>
            </div>
         </aside>
      </>
   );
};

// Aspect Ratio Btn Components
const AspectRatioBtn = ({ objectRatio, isActive, handleActiveRatioBtn }) => {
   return (
      <button
         onClick={() => handleActiveRatioBtn(objectRatio)}
         className={`ratio-btn ${isActive && "active"}`}
      >
         {objectRatio.label}
      </button>
   );
};

export default AsidebarSection;
