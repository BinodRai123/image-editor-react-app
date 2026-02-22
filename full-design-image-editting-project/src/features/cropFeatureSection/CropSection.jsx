import { useState, useRef, useEffect, useCallback } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import { useFileHandler } from "../../hooks/useFileHandler";
import DropZone from "../../components/dropZone/DropZone";
import { useCanvasLogic } from "../../hooks/useCanvasLogic.js";
import DownloadIcon from "../../components/icons/DownloadIcon";

import { useCropShape } from "./hooks/useCropShape";
import { useCropPreview } from "./hooks/useCropPreview";
import ErrorModalOverlay from "../../components/modalOverlay/errorModalOverlay/ErrorModalOverlay";

import "react-image-crop/dist/ReactCrop.css";
import "./cropSection.css";
import MenuBarButton from "../../components/menuIcon/menuIcon";

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

   const ASPECT_RATIOS = [
      { label: "1:1", value: 1 / 1 },
      { label: "16:9", value: 16 / 9 },
      { label: "4:5", value: 4 / 5 },
      { label: "Free", value: undefined }, // undefined allows free-form dragging
   ];
   const [activeRatio, setActiveRatio] = useState("1:1");
   const [isOpen, setIsOpen] = useState(false);

   const [image, setImage] = useState(null);
   const { resetCanvas } = useCanvasLogic();
   const uploadBtnRef = useRef(null);

   // State to handle the shape toggle
   const [isCircle, setIsCircle] = useState(false);

   const { showPreview, canvasRef, previewCanvasRef } = useCropPreview(isCircle);
   const { handleCropChange, toggleShape } = useCropShape({ showPreview, setCrop, setIsCircle, crop });

   //File action handler
   const { imageStatus, isDragging, modal, setModal, handleFileAction, handleDrag, handleDrop } =
      useFileHandler({ canvasRef: canvasRef, setImage, resetCanvas, uploadBtnRef });

   // { image, isDragging, handleFileAction, uploadBtnRef, showEmptyState }
   const handleDownloadCrop = () => {
      if (!previewCanvasRef.current || !image) return;

      const base64 = previewCanvasRef.current.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "crop image";
      link.href = base64;
      link.click();
   };

   //toggle modal overlay
   const toggleModalOverlay = () => setModal((prev) => !prev);

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

   /* ---- toggle sidebar ---- */
   const toggleSidebar = () => {
      setIsOpen(!isOpen);
   };

   // Inside CropSection.js
   useEffect(() => {
      if (!image) return;

      const ctx = canvasRef.current.getContext("2d");

      ctx.drawImage(image, 0, 0, canvasRef.current.width, canvasRef.current.height);
   }, [image]);

   return (
      <div className="editor-container">
         {/* Main Workspace */}

         <main onDragOver={handleDrag} onDrop={handleDrop} className="editor-main">
            <DropZone
               image={image}
               isDragging={isDragging}
               handleFileAction={handleFileAction}
               uploadBtnRef={uploadBtnRef}
               showEmptyState={!image ? true : false}
            />

            {/* Notice the display property changed from "block" to "flex" */}

            {/* Notice the display property changed from "block" to "flex" */}
            <div className="canvas-image-wrapper" style={{ display: image ? "flex" : "none" }}>
               {/* ReactCrop will now be perfectly centered by the parent's Flexbox */}
               <ReactCrop
                  crop={crop}
                  onChange={handleCropChange}
                  circularCrop={isCircle}
                  className="canvas-area"
               >
                  <canvas
                     id="canvas-image"
                     ref={canvasRef}
                     style={{
                        display: imageStatus.success && !imageStatus.uploading ? "block" : "none",
                     }}
                  />
               </ReactCrop>
            </div>

            {/* It will Appear if Error Occur during uploading image */}
            <ErrorModalOverlay
               modal={modal}
               toggleModalOverlay={toggleModalOverlay}
               erroMessage={imageStatus.errorMessage}
            >
               {/* Add Button to open file */}
               <button
                  className="btn-again"
                  onClick={() => {
                     toggleModalOverlay();
                     uploadBtnRef?.current?.click(); // Trigger upload image button on try again
                  }}
               >
                  Try Again
               </button>
            </ErrorModalOverlay>
         </main>

         <MenuBarButton toggleSidebar={toggleSidebar} isOpen={isOpen} />

         {/* Sidebar Controls */}
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
                           isActive={objectRatio.label === activeRatio}
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
      </div>
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

export default CropSection;
