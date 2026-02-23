import { useState, useRef, useEffect, useCallback } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import { useFileHandler } from "../../hooks/useFileHandler";
import DropZone from "../../components/dropZone/DropZone";
import { useCanvasLogic } from "../../hooks/useCanvasLogic.js";

import { useCropShape } from "./hooks/useCropShape";
import { useCropPreview } from "./hooks/useCropPreview";
import ErrorModalOverlay from "../../components/modalOverlay/errorModalOverlay/ErrorModalOverlay";

import "react-image-crop/dist/ReactCrop.css";
import "./cropSection.css";
import AsidebarSection from "./asidebarSection/AsidebarSection";

const CropSection = () => {
   const [crop, setCrop] = useState({
      unit: "%",
      x: 25,
      y: 25,
      width: 50,
      height: 50,
   });

   const [image, setImage] = useState(null);
   const { resetCanvas } = useCanvasLogic();
   const uploadBtnRef = useRef(null);

   // State to handle the shape toggle
   const [isCircle, setIsCircle] = useState(false);

   const { showPreview, canvasRef, previewCanvasRef } = useCropPreview(isCircle);
   const { handleCropChange, toggleShape } = useCropShape({ showPreview, setCrop, setIsCircle, crop });

   //File action handler
   const { imageStatus, isDragging, modal, setModal, handleFileAction, handleDrag, handleDrop } =
      useFileHandler({ canvasRef, setImage, resetCanvas, uploadBtnRef });

   //toggle modal overlay
   const toggleModalOverlay = () => setModal((prev) => !prev);

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

         {/* Crop Sidebar */}
         <AsidebarSection
            crop={crop}
            setCrop={setCrop}
            image={image}
            previewCanvasRef={previewCanvasRef}
            isCircle={isCircle}
         />
      </div>
   );
};

export default CropSection;
