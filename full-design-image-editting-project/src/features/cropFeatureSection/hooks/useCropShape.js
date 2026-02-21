import { useEffect } from "react";

export const useCropShape = ({ showPreview, setCrop, setIsCircle, crop }) => {
   // when user drag or use the crop feature
   const handleCropChange = (newCrop) => {
      setCrop(newCrop);
      showPreview(newCrop);
   };

   // Toggle handler to toggle between rectangle and circle shape of crop
   const toggleShape = (shape) => {
      const circleMode = shape === "circle";
      setIsCircle(circleMode);

      if (circleMode && crop) {
         //Choose the Smallest among width and height
         const size = Math.min(crop.width, crop.height);

         //makes circle crop width and height equal
         const centeredCrop = {
            ...crop,
            width: size,
            height: size,
            aspect: 1,
         };

         //after setting centerCrop applying in crop
         setCrop(centeredCrop);
         showPreview(centeredCrop);
      } else {
         // removing aspect ratio to undefined for better control
         const rectangleCrop = { ...crop, aspect: undefined };
         setCrop(rectangleCrop);
         showPreview(rectangleCrop);
      }
   };

   //apply preview when toogle shape
   useEffect(() => {
      showPreview(crop);
   }, [toggleShape]);

   return { handleCropChange, toggleShape };
};
