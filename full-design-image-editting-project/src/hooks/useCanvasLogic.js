// hooks/useCanvasLogic.js
import { useCallback, useRef } from "react";
import { generateCSSFilterString } from "../utils/imageUtils";

//canvas logic (canvasRef, applyingFilter, resetingCanvas)
export const useCanvasLogic = (image, globalFilterData) => {
   const canvasRef = useRef(null);
   const requestRef = useRef();

   const applyFilters = useCallback(() => {
      //check image and canvas
      if (!image || !canvasRef.current) return;

      const drawInCanvas = () => {
         const canvas = canvasRef.current;
         const ctx = canvas.getContext("2d");

         //convert globalFilter into css Filter string
         const filterString = generateCSSFilterString(globalFilterData);

         ctx.clearRect(0, 0, canvas.width, canvas.height); // reset canvas
         ctx.filter = filterString; //apply filter
         ctx.drawImage(image, 0, 0, canvas.width, canvas.height); //paint image on canvas
      };

      cancelAnimationFrame(requestRef.current);
      requestRef.current = requestAnimationFrame(drawInCanvas);
   }, [globalFilterData, image]);

   const resetCanvas = useCallback(() => {
      if (canvasRef.current) {
         const canvas = canvasRef.current;
         const ctx = canvas.getContext("2d");
         ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
   }, []);

   return { canvasRef, applyFilters, resetCanvas };
};
