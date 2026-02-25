// hooks/useCanvasLogic.js
import { useCallback, useRef } from "react";
import { generateCSSFilterString } from "../utils/imageUtils";
import { useAppSelector } from ".";

//canvas logic (canvasRef, applyingFilter, resetingCanvas)
export const useCanvasLogic = (filterData = null) => {
   const canvasRef = useRef(null);
   const requestRef = useRef();

   const {
      imageURL,
      width: imageWidth,
      height: imageHeight,
   } = useAppSelector((state) => state.imageEditor.currentImage);

   const img = document.createElement("img");
   img.src = imageURL;

   const applyFilters = useCallback(() => {
      //check image and canvas

      if (!img || !canvasRef.current) return;

      const drawInCanvas = () => {
         const canvas = canvasRef.current;
         const ctx = canvas?.getContext("2d");

         canvas.width = imageWidth;
         canvas.height = imageHeight;

         //convert FilterData into css Filter string
         const filterString = generateCSSFilterString(filterData);

         ctx.clearRect(0, 0, canvas.width, canvas.height); // reset canvas
         ctx.filter = filterString; //apply filter
         ctx.drawImage(img, 0, 0, canvas.width, canvas.height); //paint image on canvas
      };

      cancelAnimationFrame(requestRef.current);
      requestRef.current = requestAnimationFrame(drawInCanvas);
   }, [filterData, img]);

   const resetCanvas = useCallback(() => {
      if (canvasRef.current) {
         const canvas = canvasRef.current;
         const ctx = canvas.getContext("2d");
         ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
   }, []);

   return { canvasRef, applyFilters, resetCanvas };
};
