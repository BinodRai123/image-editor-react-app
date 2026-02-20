import { useContext, useEffect, useRef, useState } from "react";
import "./canvasImage.css";
import ModalOverlay from "../modalOverlay/ModalOverlay";
import { reactContext } from "../../WrapFilterData/WrapperFilters";
import UnderConstruction from "../../pages/underConstruction";
import { useCanvasLogic } from "../../hooks/useCanvasLogic.js";
import { useFileHandler } from "../../hooks/useFileHandler.js"; // New Hook
import DropZone from "../dropZone/DropZone"; // New Component
import CropSection from "../../features/cropFeatureSection/CropSection.jsx";
import { DEFAULT_FILTERS } from "../..//utils/imageUtils";

const CanvasImage = ({ activeFeature }) => {
   const { globalFilterData, setGlobalFilterData, setOriginalImage } = useContext(reactContext);
   const [image, setImage] = useState(null);
   const uploadBtnRef = useRef(null);

   const { canvasRef, applyFilters, resetCanvas } = useCanvasLogic(image, globalFilterData);

   //custom hook to handle file logic
   const { imageStatus, isDragging, modal, setModal, handleFileAction, handleDrag, handleDrop } =
      useFileHandler({ canvasRef, setImage, resetCanvas, setGlobalFilterData, uploadBtnRef });

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

   return (
      <section
         className={`canvas-image-container ${isDragging ? "drag-active" : ""}`}
         onDragOver={handleDrag}
         onDrop={handleDrop}
      >
         {/* When image is uploading this will show up to inform */}
         {imageStatus.uploading && <div className="canvas-skeleton">Uploading...</div>}

         {/* Current Feature like: Filter, Crop, Layer and so on. */}
         {activeFeature === "brush" ? (
            <>
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
               <DropZone
                  image={image}
                  isDragging={isDragging}
                  handleFileAction={handleFileAction}
                  uploadBtnRef={uploadBtnRef}
                  showEmptyState={!imageStatus.success && !imageStatus.uploading && !image}
               />
            </>
         ) : activeFeature === "crop" ? (
            <CropSection />
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

export default CanvasImage;
