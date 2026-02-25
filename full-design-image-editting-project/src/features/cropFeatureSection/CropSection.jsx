import { useState, useRef, useEffect } from "react";
import ReactCrop from "react-image-crop";
import { useFileHandler } from "../../hooks/useFileHandler";
import DropZone from "../../components/dropZone/DropZone";
import { useCanvasLogic } from "../../hooks/useCanvasLogic.js";

import { useCropShape } from "./hooks/useCropShape";
import { useCropPreview } from "./hooks/useCropPreview";
import ErrorModalOverlay from "../../components/modalOverlay/errorModalOverlay/ErrorModalOverlay";
import CanvasSkeleton from "../../components/loadingUI/CanvasSkeleton/CanvasSkeleton";

import "react-image-crop/dist/ReactCrop.css";
import AsidebarSection from "./asidebarSection/AsidebarSection";
import { useAppSelector } from "../../hooks/index";
import "./cropSection.css";

const CropSection = () => {
   const [crop, setCrop] = useState({
      unit: "%",
      x: 25,
      y: 25,
      width: 50,
      height: 50,
   });
   const [isLoadingUIActive, setIsLoadingUIActive] = useState(true);
   const { resetCanvas } = useCanvasLogic();
   const uploadBtnRef = useRef(null);

   // State to handle the shape toggle
   const [isCircle, setIsCircle] = useState(false);

   //Dispatch and Selector for image cropper
   const { imageURL, height, width } = useAppSelector((state) => state.imageCropper.image);

   //Cropped image Preview
   const { showPreview, canvasRef, previewCanvasRef } = useCropPreview(isCircle);
   const { handleCropChange, toggleShape } = useCropShape({ showPreview, setCrop, setIsCircle, crop });

   //File action handler
   const { imageStatus, isDragging, modal, setModal, handleFileAction, handleDrag, handleDrop } =
      useFileHandler({ canvasRef, resetCanvas, uploadBtnRef, mode: "imageCropper", setIsLoadingUIActive });

   //toggle modal overlay
   const toggleModalOverlay = () => setModal((prev) => !prev);

   // Insert image into Canvas
   useEffect(() => {
      if (!imageURL) return;
      const Image = document.createElement("img");
      Image.src = imageURL;
      // console.log("image -> ", Image);

      Image.onload = () => {
         const ctx = canvasRef.current.getContext("2d");
         canvasRef.current.width = width;
         canvasRef.current.height = height;

         // console.log("image", Image);

         ctx.drawImage(Image, 0, 0, canvasRef.current.width, canvasRef.current.height);
      };
   }, [imageURL]);

   useEffect(() => {
      const timerId = setTimeout(() => {
         setIsLoadingUIActive(false);
      }, 500);

      return () => clearTimeout(timerId);
   }, []);

   return (
      <div className="editor-container">
         {/* Main Workspace */}

         <main onDragOver={handleDrag} onDrop={handleDrop} className="editor-main">
            {(imageStatus.uploading || isLoadingUIActive) && (
               <CanvasSkeleton message={`${imageURL ? "UPLOADING IMAGE..." : "LOADING..."}`} />
            )}

            <DropZone
               image={imageURL}
               isDragging={isDragging}
               handleFileAction={handleFileAction}
               uploadBtnRef={uploadBtnRef}
               showEmptyState={!imageURL && !isLoadingUIActive ? true : false}
            />

            {/* Notice the display property changed from "block" to "flex" */}
            <div
               className="canvas-image-wrapper"
               style={{ display: imageURL && !isLoadingUIActive ? "flex" : "none" }}
            >
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
                        display: imageURL && !imageStatus.uploading ? "block" : "none",
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
                     uploadBtnRef?.current?.click(); // Trigger upload image button as try again
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
            image={imageURL}
            previewCanvasRef={previewCanvasRef}
            isCircle={isCircle}
         />
      </div>
   );
};

export default CropSection;
