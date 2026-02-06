import { useState, useCallback } from "react";
import { processImageUpload, DEFAULT_FILTERS } from "../utils/imageUtils.js";

export const useFileHandler = (canvasRef, setImage, resetCanvas, setGlobalFilterData, uploadBtnRef) => {
   const [imageStatus, setImageStatus] = useState({ success: false, uploading: false, errorMessage: null });
   const [isDragging, setIsDragging] = useState(false);
   const [modal, setModal] = useState(false);

   const handleFileAction = async (file) => {
      if (!file) return;
      //initalizing process of image uploading
      setImageStatus({ success: false, uploading: true, errorMessage: null });

      try {
         //This function Create image, check if it is valid
         //calculate the height and width of image and return it
         const { img, width, height } = await processImageUpload(file);

         // 1. Adding height and width in canvas
         canvasRef.current.width = width;
         canvasRef.current.height = height;
         setImage(img); //updating image state
         resetCanvas(); //reseting the canvas
         setGlobalFilterData(DEFAULT_FILTERS); //making the global filter value to default
         setImageStatus({ success: true, uploading: false, errorMessage: null });
      } catch (error) {
         setImageStatus({ success: false, uploading: false, errorMessage: error });
         setModal(true);
      } finally {
         // 2. RESET THE INPUT FILE
         if (uploadBtnRef.current) {
            //after uploading the image
            //reseting the upload image button value
            uploadBtnRef.current.value = "";
         }
      }
   };

   // Drag the file functionality
   const handleDrag = useCallback((e) => {
      e.preventDefault();
      setIsDragging(e.type === "dragenter" || e.type === "dragover");
   }, []);

   // Drop The file functionality
   const handleDrop = useCallback((e) => {
      e.preventDefault();
      setIsDragging(false);
      handleFileAction(e.dataTransfer.files[0]);
   }, []);

   return {
      imageStatus,
      setImageStatus,
      isDragging,
      modal,
      setModal,
      handleFileAction,
      handleDrag,
      handleDrop,
   };
};
