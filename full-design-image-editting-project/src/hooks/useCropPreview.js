import { useCallback, useRef } from "react";

export const useCropPreview = (isCircle) => {
   const imgRef = useRef(null);
   const previewCanvasRef = useRef(null);

   const showPreview = useCallback(
      (currentCrop) => {
         if (!imgRef.current || !previewCanvasRef.current || !currentCrop.width || !currentCrop.height) {
            return;
         }

         const image = imgRef.current;
         const canvas = previewCanvasRef.current;
         const ctx = canvas.getContext("2d");

         const scaleX = image.naturalWidth / image.width;
         const scaleY = image.naturalHeight / image.height;

         // --- NEW LOGIC STARTS HERE ---
         let drawWidth = currentCrop.width * scaleX;
         let drawHeight = currentCrop.height * scaleY;

         if (isCircle) {
            // Force the canvas to be a square based on the smaller side
            const size = Math.min(drawWidth, drawHeight);
            canvas.width = size;
            canvas.height = size;
         } else {
            canvas.width = Math.floor(drawWidth);
            canvas.height = Math.floor(drawHeight);
         }

         ctx.clearRect(0, 0, canvas.width, canvas.height);
         ctx.imageSmoothingQuality = "high";

         if (isCircle) {
            ctx.save();
            ctx.beginPath();
            // Circle centered in new square canvas
            ctx.arc(canvas.width / 2, canvas.height / 2, canvas.width / 2, 0, 2 * Math.PI);
            ctx.clip();
         }

         // When drawing the image, center the crop area if it's a circle
         const sourceX = isCircle
            ? currentCrop.x * scaleX + (drawWidth - canvas.width) / 2
            : currentCrop.x * scaleX;
         const sourceY = isCircle
            ? currentCrop.y * scaleY + (drawHeight - canvas.height) / 2
            : currentCrop.y * scaleY;

         ctx.drawImage(
            image,
            sourceX,
            sourceY,
            isCircle ? canvas.width : drawWidth,
            isCircle ? canvas.height : drawHeight,
            0,
            0,
            canvas.width,
            canvas.height,
         );

         if (isCircle) ctx.restore();
      },
      [isCircle],
   );

   return { showPreview, imgRef, previewCanvasRef };
};
