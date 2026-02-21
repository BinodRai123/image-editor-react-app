import ErrorModalOverlay from "../../components/modalOverlay/errorModalOverlay/ErrorModalOverlay";
import DropZone from "../../components/dropZone/DropZone";
import { useCanvasLogic } from "../../hooks/useCanvasLogic";
import { useFileHandler } from "../../hooks/useFileHandler";
import { reactContext } from "../../WrapFilterData/WrapperFilters";
import React, { useContext, useEffect, useRef, useState } from "react";
import "./BrushSectionStyle.css";

const BrushSection = () => {
   const { globalFilterData, setGlobalFilterData, setOriginalImage } = useContext(reactContext);
   const [image, setImage] = useState(null);
   const uploadBtnRef = useRef(null);

   const { canvasRef, applyFilters, resetCanvas } = useCanvasLogic(image, globalFilterData);

   //custom hook to handle file logic
   const { imageStatus, isDragging, modal, setModal, handleFileAction, handleDrag, handleDrop } =
      useFileHandler({ canvasRef, setImage, resetCanvas, setGlobalFilterData, uploadBtnRef });

   //Toggle modal overlay
   const toggleModalOverlay = () => setModal((prev) => !prev);

   //Paint canvas with Filter when globalFilter changed
   useEffect(() => {
      if (!image) return; //if there is no image then return

      applyFilters(); // if ther is image then apply this filter

      const handler = setTimeout(() => setOriginalImage(image), 200);
      return () => {
         clearTimeout(handler);
      };
   }, [globalFilterData, image, applyFilters, setOriginalImage]);

   // console.log("canvas -> ", canvasRef?.current.width);

   return (
      <section
         className={`canvas-image-container ${isDragging ? "drag-active" : ""}`}
         onDragOver={handleDrag}
         onDrop={handleDrop}
      >
         {/* When image is uploading this will show up to inform */}
         {imageStatus.uploading && <div className="canvas-skeleton">Uploading...</div>}

         {/* <div class="bg-checkerboard"></div> */}
         <canvas
            id="canvas-image-preview"
            className={isDragging ? "canvas-blur" : ""}
            ref={canvasRef}
            style={{
               display: imageStatus.success && !imageStatus.uploading ? "block" : "none",
            }}
         />
         <DropZone
            image={image}
            isDragging={isDragging}
            handleFileAction={handleFileAction}
            uploadBtnRef={uploadBtnRef}
            showEmptyState={!imageStatus.success && !imageStatus.uploading && !image}
         />

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
      </section>
   );
};

export default BrushSection;
