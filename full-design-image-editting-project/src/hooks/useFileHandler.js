import { useState, useCallback } from "react";
import { processImageUpload, DEFAULT_FILTERS } from "../utils/imageUtils.js";
import { useAppDispatch } from "./index.js";
import { resetEditor, setCurrentImage } from "../Redux/slices/ImageFilter/imageFilterSlicer.js";
import { setCropImage } from "../Redux/slices/cropImage/cropImageSlilcer.js";

export const useFileHandler = ({ canvasRef, resetCanvas, uploadBtnRef = null, mode }) => {
   const [imageStatus, setImageStatus] = useState({ success: false, uploading: false, errorMessage: null });
   const [isDragging, setIsDragging] = useState(false);
   const [modal, setModal] = useState(false);
   const dispatch = useAppDispatch();

   const handleFileAction = async (file) => {
      if (!file) return;
      //initalizing process of image uploading
      setImageStatus({ success: false, uploading: true, errorMessage: null });

      try {
         //This function Create image, check if it is valid
         //calculate the height and width of image and return it
         const { img, width, height, imageURL, originalImageHeight, originalImageWidth } =
            await processImageUpload(file);

         //This Dispatch will Run if this is from image editor section
         if (mode === "imageEditor") {
            //Updating image, width and height in the redux toolkit
            dispatch(
               setCurrentImage({
                  imageURL,
                  width,
                  height,
                  originalImageHeight,
                  originalImageWidth,
               }),
            );

            resetCanvas(); //reseting the canvas

            dispatch(resetEditor()); //Reseting the filterData to initial Value
         }

         // This Dispatch will run if it is from image cropper section
         if (mode === "imageCropper") {
            resetCanvas();

            dispatch(setCropImage({ imageURL, width, height }));
         }

         setImageStatus({ success: true, uploading: false, errorMessage: null });
      } catch (error) {
         setImageStatus({ success: false, uploading: false, errorMessage: error });
         setModal(true);
      } finally {
         // 2. RESET THE INPUT FILE
         if (uploadBtnRef?.current) {
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
