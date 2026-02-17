import { useState, useRef } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const imageUrl =
   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFYqoKTu_o3Zns2yExbst2Co84Gpc2Q1RJbA&s";

const CropSection = () => {
   const [crop, setCrop] = useState();
   const [completedCrop, setCompletedCrop] = useState(null);
   const imgRef = useRef(null);

   // Helper to trigger the download
   const downloadCrop = () => {
      if (!completedCrop || !imgRef.current) return;

      const image = imgRef.current;
      const canvas = document.createElement("canvas");
      const scaleX = image.naturalWidth / image.width;
      const scaleY = image.naturalHeight / image.height;

      canvas.width = completedCrop.width;
      canvas.height = completedCrop.height;
      const ctx = canvas.getContext("2d");

      // Draw the specific region of the image onto the canvas
      ctx.drawImage(
         image,
         completedCrop.x * scaleX,
         completedCrop.y * scaleY,
         completedCrop.width * scaleX,
         completedCrop.height * scaleY,
         0,
         0,
         completedCrop.width,
         completedCrop.height,
      );

      // Convert canvas to a data URL and download
      const base64Image = canvas.toDataURL("image/jpeg");
      const link = document.createElement("a");
      link.download = "cropped-image.jpg";
      link.href = base64Image;
      link.click();
   };

   return (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "20px" }}>
         <ReactCrop crop={crop} onChange={(c) => setCrop(c)} onComplete={(c) => setCompletedCrop(c)}>
            <img
               ref={imgRef}
               src={imageUrl}
               alt="Crop me"
               crossOrigin="anonymous" // Crucial for avoiding "Tainted Canvas" errors
            />
         </ReactCrop>

         <button onClick={downloadCrop} style={{ padding: "10px 20px", cursor: "pointer" }}>
            Download Cropped Image
         </button>
      </div>
   );
};

export default CropSection;
