// hooks/useCanvasLogic.js
import { useCallback, useRef } from "react";
import { getFilterString, MAX_PREVIEW_SIZE } from "../utils/imageUtils";

export const useCanvasLogic = (image, globalFilterData) => {
   const canvasRef = useRef(null);
   const requestRef = useRef();

   const applyFilters = useCallback(() => {
      if (!image || !canvasRef.current) return;

      const drawInCanvas = () => {
         const canvas = canvasRef.current;
         const ctx = canvas.getContext("2d");
         const filterString = getFilterString(globalFilterData);

         ctx.clearRect(0, 0, canvas.width, canvas.height);
         ctx.filter = filterString;
         ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      };

      cancelAnimationFrame(requestRef.current);
      requestRef.current = requestAnimationFrame(drawInCanvas);
   }, [globalFilterData, image]);

   const calculateDimensions = (img) => {
      let width = img.width;
      let height = img.height;

      if (width > MAX_PREVIEW_SIZE || height > MAX_PREVIEW_SIZE) {
         const ratio = Math.min(MAX_PREVIEW_SIZE / width, MAX_PREVIEW_SIZE / height);
         width *= ratio;
         height *= ratio;
      }
      return { width, height };
   };

   const resetCanvas = useCallback(() => {
      if (canvasRef.current) {
         const canvas = canvasRef.current;
         const ctx = canvas.getContext("2d");
         ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
   }, []);

   return { canvasRef, applyFilters, calculateDimensions, resetCanvas };
};
