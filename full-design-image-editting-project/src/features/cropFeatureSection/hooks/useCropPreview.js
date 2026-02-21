import { useCallback, useRef } from "react";

export const useCropPreview = (isCircle) => {
   const canvasRef = useRef(null);
   const previewCanvasRef = useRef(null);

   const showPreview = useCallback(
      (currentCrop) => {
         const image = canvasRef?.current;
         const canvas = previewCanvasRef?.current;

         if (!image || !canvas || !currentCrop.width || !currentCrop.height) {
            return;
         }

         const ctx = canvas.getContext("2d");
         if (!ctx) return;

         // 1. Get the real scaling factor
         // If canvasRef is a canvas where you drew the image, use its internal dimensions
         const scaleX = image.width / image.offsetWidth || 1;
         const scaleY = image.height / image.offsetHeight || 1;

         // 2. Adjust for High DPI displays (Retina)
         const pixelRatio = window.devicePixelRatio || 1;

         // 3. Calculate actual pixel dimensions for the crop
         const cropX = currentCrop.x * scaleX;
         const cropY = currentCrop.y * scaleY;
         const cropWidth = currentCrop.width * scaleX;
         const cropHeight = currentCrop.height * scaleY;

         // 4. Set preview canvas size
         // We use a square if it's a circle to avoid stretching
         const size = isCircle ? Math.min(cropWidth, cropHeight) : 0;
         canvas.width = (isCircle ? size : cropWidth) * pixelRatio;
         canvas.height = (isCircle ? size : cropHeight) * pixelRatio;

         ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
         ctx.imageSmoothingQuality = "high";

         // 5. Handle Circular Clipping
         if (isCircle) {
            ctx.save();
            ctx.beginPath();
            ctx.arc(size / 2, size / 2, size / 2, 0, 2 * Math.PI);
            ctx.clip();
         }

         // 6. Draw the image
         // We map the source (cropX, cropY) to the destination (0, 0)
         ctx.drawImage(
            image,
            cropX,
            cropY,
            cropWidth,
            cropHeight,
            0,
            0,
            isCircle ? size : cropWidth,
            isCircle ? size : cropHeight,
         );

         if (isCircle) ctx.restore();
      },
      [isCircle],
   );

   return { showPreview, canvasRef, previewCanvasRef };
};
