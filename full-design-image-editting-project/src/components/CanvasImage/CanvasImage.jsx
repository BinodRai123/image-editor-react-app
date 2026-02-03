import React, { useContext, useEffect, useRef, useState } from "react";
import "./canvasImage.css";
import ModalOverlay from "../modalOverlay/ModalOverlay";
import { reactContext } from "../../WrapFilterData/WrapperFilters";
import UnderConstruction from "../../pages/underConstruction";
import { processImageUpload, DEFAULT_FILTERS } from "../../utils/imageUtils.js";
import { useCanvasLogic } from "../../hooks/useCanvasLogic.js";

const CanvasImage = ({ activeFeature }) => {
   const { globalFilterData, setGlobalFilterData, setOriginalImage } = useContext(reactContext);
   const [imageStatus, setImageStatus] = useState({ success: false, uploading: false });
   const [image, setImage] = useState(null);
   const [isDragging, setIsDragging] = useState(false);
   const [modal, setModal] = useState(false);
   const uploadBtnRef = useRef(null);

   const { canvasRef, applyFilters, calculateDimensions, resetCanvas } = useCanvasLogic(
      image,
      globalFilterData,
   );

   const toggleModalOverlay = () => setModal((prev) => !prev);

   useEffect(() => {
      if (!image) return; //if there is no image then return
      applyFilters(); // if ther is image then apply this filter
      const handler = setTimeout(() => setOriginalImage(image), 200);
      return () => clearTimeout(handler);
   }, [globalFilterData, image, applyFilters, setOriginalImage]);

   // Inside CanvasImage.jsx

   const handleFileAction = async (file) => {
      if (!file) return;

      //Initializing the image uploading states
      setImageStatus({ success: false, uploading: true, errorMessage: null });

      try {
         //when user click then it will
         const { img, width, height } = await processImageUpload(file);

         // 1. Set Canvas size
         canvasRef.current.width = width;
         canvasRef.current.height = height;

         // 2. Update States
         setImage(img); //updating image state
         setGlobalFilterData(DEFAULT_FILTERS); //making the global filter value to default
         setImageStatus({ success: true, uploading: false, errorMessage: null });
      } catch (error) {
         setImageStatus({ success: false, uploading: false, errorMessage: error });
         setModal(true);
      } finally {
         // 3. RESET THE INPUT FILE
         if (uploadBtnRef.current) {
            //after uploading the image
            //reseting the upload image button value
            uploadBtnRef.current.value = "";
         }
      }
   };

   // UI Handlers
   const handleDrag = (e) => {
      e.preventDefault();
      setIsDragging(e.type === "dragenter" || e.type === "dragover");
   };

   const handleDrop = (e) => {
      e.preventDefault();
      setIsDragging(false);
      handleFileAction(e.dataTransfer.files[0]);
   };

   return (
      <section
         className={`canvas-image-container ${isDragging ? "drag-active" : ""}`}
         onDragOver={handleDrag}
         onDrop={handleDrop}
      >
         {/* When image is uploading this will show up to inform */}
         {imageStatus.uploading && <div className="canvas-skeleton">Uploading...</div>}

         {/* Canvas will display only when an image is uploaded */}
         <canvas
            id="canvas-image-preview"
            className={isDragging ? "canvas-blur" : ""}
            ref={canvasRef}
            style={{
               display:
                  imageStatus.success && !imageStatus.uploading && activeFeature === "brush"
                     ? "block"
                     : "none",
            }}
         />

         {/* 2. THE EMPTY STATE (Show only if no image is loaded) */}
         {!imageStatus.success && !imageStatus.uploading && <EmptyState isDragging={isDragging} />}

         {activeFeature === "brush" ? (
            <div className="upload-zone">
               <label htmlFor="image-upload" className="btn upload-btn">
                  {isDragging ? "Drop to Upload" : "Upload or Drag Image"}
               </label>
               <input
                  ref={uploadBtnRef}
                  type="file"
                  id="image-upload"
                  onChange={(e) => handleFileAction(e.target.files[0])}
                  accept="image/*"
               />
            </div>
         ) : (
            <UnderConstruction />
         )}

         <ModalOverlay modal={modal} toggleModalOverlay={toggleModalOverlay}>
            <div className="error-modal-container" onClick={(e) => e.stopPropagation()}>
               <div className="icon-circle">
                  <span className="cross-icon">×</span>
               </div>

               <div className="text-group">
                  <h2 className="title">ERROR</h2>

                  <p className="description">Only Image Files are Supported</p>
               </div>

               <button
                  className="btn-again"
                  onClick={() => {
                     toggleModalOverlay();
                     uploadBtnRef.current?.click(); // Trigger upload image button on try again
                  }}
               >
                  Try Again
               </button>
            </div>
         </ModalOverlay>
      </section>
   );
};

// Empty State Component
// if there is no image uploaded yet
const EmptyState = ({ isDragging }) => {
   return (
      <div className={`upload-placeholder ${isDragging ? "active" : ""}`}>
         <div className="upload-icon-container">
            {/* You can replace this with an SVG or the image you provided */}
            <div className="icon-cloud">
               <span className="arrow-up">↑</span>
            </div>
         </div>
         <div className="upload-text">
            <h3>Drag and drop or click here</h3>
            <p>to upload your image (max 1200px)</p>
         </div>
         {/* This invisible label covers the whole area to make it clickable */}
         <label htmlFor="image-upload" className="full-area-label" />
      </div>
   );
};

export default CanvasImage;
