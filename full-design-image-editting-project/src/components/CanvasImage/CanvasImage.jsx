import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import "./canvasImage.css";
import ModalOverlay from "../modalOverlay/ModalOverlay";
import { reactContext } from "../../WrapFilterData/WrapperFilters";
import UnderConstruction from "../../pages/underConstruction";

const MAX_PREVIEW_SIZE = 1200;

const CanvasImage = ({ activeFeature }) => {
   const { globalFilterData, setGlobalFilterData, setOriginalImage } = useContext(reactContext);

   const [imageStauts, setImageStatus] = useState({ sucess: false, uploading: false, errorMessage: null });
   const [image, setImage] = useState(null);
   const [isDragging, setIsDragging] = useState(false); // New state for UI feedback
   console.log(imageStauts.sucess, activeFeature);

   const canvasRef = useRef(null);
   const canvasContext = useRef(null);
   const uploadBtnRef = useRef(null);
   const [modal, setModal] = useState(false);
   const requestRef = useRef();

   const toggleModalOverlay = () => setModal(!modal);

   useEffect(() => {
      canvasContext.current = canvasRef.current?.getContext("2d");
   }, []);

   useEffect(() => {
      if (!image) return;
      applyFilters();
      const handler = setTimeout(() => {
         setOriginalImage(image);
      }, 200);

      return () => {
         clearTimeout(handler);
         cancelAnimationFrame(requestRef.current);
      };
   }, [globalFilterData, image]);

   // --- OPTIMIZED FILE PROCESSING CORE ---
   const processFile = (file) => {
      if (!file) return;

      if (!file.type.startsWith("image/")) {
         setImageStatus({
            sucess: false,
            uploading: false,
            errorMessage: "only image file are supported",
         });
         setOriginalImage(null);
         setModal(true);
         if (uploadBtnRef.current) uploadBtnRef.current.value = "";
         return;
      }

      setImageStatus((prev) => ({ ...prev, uploading: true }));

      const canvas = canvasRef.current;
      let img = new Image();
      img.src = URL.createObjectURL(file);

      img.onload = () => {
         let width = img.width;
         let height = img.height;

         if (width > MAX_PREVIEW_SIZE || height > MAX_PREVIEW_SIZE) {
            const ratio = Math.min(MAX_PREVIEW_SIZE / width, MAX_PREVIEW_SIZE / height);
            width *= ratio;
            height *= ratio;
         }

         setImage(img);
         canvas.width = width;
         canvas.height = height;
         ResetFilter();
         setImageStatus({ sucess: true, uploading: false, errorMessage: null });
      };

      img.onerror = () => {
         setImageStatus({ sucess: false, uploading: false, errorMessage: "something went wrong" });
      };
   };

   // --- DRAG AND DROP HANDLERS ---
   const handleDrag = (e) => {
      e.preventDefault();
      e.stopPropagation();
      if (e.type === "dragenter" || e.type === "dragover") {
         setIsDragging(true);
      } else if (e.type === "dragleave") {
         setIsDragging(false);
      }
   };

   const handleDrop = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];
      processFile(file);
   };

   const hangleImageUploadInCanvas = (e) => {
      processFile(e.target?.files[0]);
   };

   const applyFilters = useCallback(() => {
      if (!image) return;

      const drawInCanvas = () => {
         let allfiltervalue = "";
         for (const key in globalFilterData) {
            allfiltervalue += `${key}(${globalFilterData[key]["value"]}${globalFilterData[key]["unit"]}) `;
         }

         let canvasCtx = canvasContext.current;
         canvasCtx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height);
         canvasCtx.filter = allfiltervalue.trim();
         canvasCtx.drawImage(image, 0, 0, canvasRef.current.width, canvasRef.current.height);
      };

      cancelAnimationFrame(requestRef.current);
      requestRef.current = requestAnimationFrame(drawInCanvas);
   }, [globalFilterData, image]);

   const ResetFilter = useCallback(() => {
      setGlobalFilterData({
         brightness: { value: 100, unit: "%" },
         contrast: { value: 100, unit: "%" },
         saturate: { value: 100, unit: "%" },
         "hue-rotate": { value: 0, unit: "deg" },
         blur: { value: 0, unit: "px" },
         grayscale: { value: 0, unit: "%" },
         sepia: { value: 0, unit: "%" },
         opacity: { value: 100, unit: "%" },
         invert: { value: 0, unit: "%" },
      });
   }, [setGlobalFilterData]);

   return (
      <>
         <section
            className={`canvas-image-container ${isDragging ? "drag-active" : ""}`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
         >
            {imageStauts.uploading && (
               <div className="canvas-skeleton">
                  <div className="skeleton-shimmer"></div>
                  <p>Optimizing Image...</p>
               </div>
            )}

            <canvas
               id="canvas-image-preview"
               className={isDragging ? "canvas-blur" : ""}
               style={{
                  display:
                     imageStauts.sucess && !imageStauts.uploading && activeFeature === "brush"
                        ? "block"
                        : "none",
               }}
               ref={canvasRef}
            ></canvas>

            {activeFeature !== "brush" && <UnderConstruction />}

            {activeFeature === "brush" && (
               <div className="upload-zone">
                  <label htmlFor="image-upload" className="btn upload-btn">
                     {isDragging ? "Drop to Upload" : "Upload or Drag Image"}
                  </label>
                  <input
                     ref={uploadBtnRef}
                     type="file"
                     id="image-upload"
                     onChange={hangleImageUploadInCanvas}
                     accept="image/*"
                  />
               </div>
            )}

            {/* Error Modal */}
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
      </>
   );
};

export default CanvasImage;
