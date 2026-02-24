import ErrorModalOverlay from "../../components/modalOverlay/errorModalOverlay/ErrorModalOverlay";
import DropZone from "../../components/dropZone/DropZone";
import { useCanvasLogic } from "../../hooks/useCanvasLogic";
import { useFileHandler } from "../../hooks/useFileHandler";
import React, { useEffect, useRef, useState } from "react";
import "./BrushSectionStyle.css";
import { useAppDispatch, useAppSelector } from "../../hooks/index";
import { setCurrentImage } from "../../Redux/slices/ImageFilter/imageFilterSlicer";

const BrushSection = () => {
   const uploadBtnRef = useRef(null);
   const filterData = useAppSelector((state) => state.imageEditor.filters);

   const imageURL = useAppSelector((state) => state.imageEditor.currentImage.imageURL);
   const dispatch = useAppDispatch();

   const { canvasRef, applyFilters, resetCanvas } = useCanvasLogic(filterData);

   //custom hook to handle file logic
   const { imageStatus, isDragging, modal, setModal, handleFileAction, handleDrag, handleDrop } =
      useFileHandler({ canvasRef, resetCanvas, uploadBtnRef, mode: "imageEditor" });

   //Toggle modal overlay
   const toggleModalOverlay = () => setModal((prev) => !prev);

   //Paint canvas with Filter when Redux Filter data changed
   useEffect(() => {
      if (!imageURL) return; //if there is no image then return

      applyFilters(); // if ther is image then apply this filter
   }, [filterData, imageURL, applyFilters]);

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
               display: imageURL ? "block" : "none",
            }}
         />
         <DropZone
            image={imageURL}
            isDragging={isDragging}
            handleFileAction={handleFileAction}
            uploadBtnRef={uploadBtnRef}
            showEmptyState={!imageStatus.success && !imageStatus.uploading && !imageURL}
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
