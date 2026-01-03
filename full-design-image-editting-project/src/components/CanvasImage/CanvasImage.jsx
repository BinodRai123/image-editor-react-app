import React, { useCallback, useContext, useEffect, useRef, useState } from "react";
import "./canvasImage.css";
import ModalOverlay from "../modalOverlay/ModalOverlay";
import { reactContext } from "../../WrapFilterData/WrapperFilters";

const MAX_PREVIEW_SIZE = 1200;

const CanvasImage = () => {
   const { globalFilterData, setGlobalFilterData, setOriginalImage } = useContext(reactContext);

   const [imageStauts, setImageStatus] = useState({ sucess: false, uploading: false, errorMessage: null });
   const [image, setImage] = useState(null);
   //holds the canvas element
   const canvasRef = useRef(null);
   const canvasContext = useRef(null);
   const uploadBtnRef = useRef(null);
   const [modal, setModal] = useState(false);
   const requestRef = useRef();

   //Toggle Modal components which will appear and disappear
   const toggleModalOverlay = () => {
      setModal(!modal);
   };

   //It hold the value of getContext("2d"), which will not
   //lost while re-rendering
   useEffect(() => {
      canvasContext.current = canvasRef.current?.getContext("2d");
   }, []);

   //Apply Filter to Image immediately when
   //Filter Data or Image Change
   useEffect(() => {
      if (!image) return;
      applyFilters();
      // Only set the Original image after the user stops sliding (200ms)
      const handler = setTimeout(() => {
         setOriginalImage(image);
      }, 200);

      return () => {
         clearTimeout(handler);
         cancelAnimationFrame(requestRef.current);
      };
   }, [globalFilterData, image]);

   //Upload Image in Canvas
   const hangleImageUploadInCanvas = (e) => {
      const file = e.target?.files[0];
      // If user click "choose file" and cancles
      // then it will return from here
      if (!file) return;

      //retrun if user donot select image file
      //and update the setimagestatus
      if (!file.type.startsWith("image/")) {
         //input file store here to reset
         //when another file is selected
         const input = e.target;
         setImageStatus({
            sucess: false,
            uploading: false,
            errorMessage: "only image file are supported",
         });
         setOriginalImage(null);
         //modal will appear
         setModal(true);
         //Reset file input
         input.value = "";
         return;
      }

      setImageStatus((prev) => ({ ...prev, uploading: true }));

      //Selecting canvas div using canvasRef
      //and making it 2d for image upload
      const canvas = canvasRef.current;
      let canvasCtx = canvasContext.current;

      let img = new Image();
      img.src = URL.createObjectURL(file);

      //image.onload will wait until the image fully
      //loaded in the website and after that it will
      //set height , width and drawimage in canvas
      img.onload = () => {
         // Calculate scaling to prevent lagging on 10MB+ files
         let width = img.width;
         let height = img.height;

         if (width > MAX_PREVIEW_SIZE || height > MAX_PREVIEW_SIZE) {
            if (width > height) {
               height = (MAX_PREVIEW_SIZE / width) * height;
               width = MAX_PREVIEW_SIZE;
            } else {
               width = (MAX_PREVIEW_SIZE / height) * width;
               height = MAX_PREVIEW_SIZE;
            }
         }
         setImage(img);
         canvas.width = width;
         canvas.height = height;
         // canvasCtx.drawImage(img, 0, 0, canvas.width, canvas.height);
         ResetFilter();

         setImageStatus((prev) => ({ ...prev, uploading: false }));
      };

      img.onerror = () => {
         setImageStatus((prev) => ({ ...prev, errorMessage: "something went wrong" }));
      };

      //This will tell the image has sucessfully uploaded
      setImageStatus((prev) => ({ ...prev, sucess: true }));
   };

   //Applying Filters in Canvas Image
   const applyFilters = useCallback(() => {
      //if there is no image then return from here
      if (!image) return;

      const drawInCanvas = () => {
         let allfiltervalue = "";

         for (const key in globalFilterData) {
            allfiltervalue += `${key}(${globalFilterData[key]["value"]}${globalFilterData[key]["unit"]}) `;
         }

         let canvasCtx = canvasContext.current;
         canvasCtx.clearRect(0, 0, image.width, image.height);
         canvasCtx.filter = `${allfiltervalue.trim()}`;
         canvasCtx.drawImage(image, 0, 0, canvasRef.current.width, canvasRef.current.height);
      };

      cancelAnimationFrame(requestRef.current);
      requestRef.current = requestAnimationFrame(drawInCanvas);
   }, [globalFilterData, image]);

   //Reset Filter to Default Value
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
   });

   return (
      <>
         <section className="canvas-image-container">
            {/* SKELETON LOADER */}
            {imageStauts.uploading && (
               <div className="canvas-skeleton">
                  <div className="skeleton-shimmer"></div>
                  <p>Optimizing Image...</p>
               </div>
            )}

            {/* Canvas element willnot show until imageStaus is true */}
            <canvas
               id="canvas-image-preview"
               style={{ display: imageStauts.sucess && !imageStauts.uploading ? "block" : "none" }}
               ref={canvasRef}
            ></canvas>
            {/* Upload Image Button */}
            <div>
               <label htmlFor="image-upload" className="btn upload-btn">
                  Upload Image
               </label>
               {/* //hides the input field and style 
                  //the label for uploading images */}
               <input ref={uploadBtnRef} type="file" id="image-upload" onChange={hangleImageUploadInCanvas} />
            </div>

            {/* Error Message */}
            <ModalOverlay modal={modal} toggleModalOverlay={toggleModalOverlay}>
               <div className="error-modal-container" onClick={(e) => e.stopPropagation()}>
                  {/* Icon Container */}
                  <div className="icon-circle" aria-hidden="true">
                     <span className="cross-icon">×</span>
                  </div>

                  {/* Text Content */}
                  <div className="text-group">
                     <h2 className="title">ERROR</h2>
                     <p className="description">Only Image File are Supported</p>
                  </div>

                  {/* Action Button */}
                  <button
                     className="btn-again"
                     //Click the uploadBtn when click try again button
                     onClick={() => {
                        toggleModalOverlay();
                        uploadBtnRef?.current?.click();
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
