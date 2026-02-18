import { useCropShape } from "../../hooks/useCropShape";
import { useCropPreview } from "../../hooks/useCropPreview";
import { useState, useRef, useEffect, useCallback } from "react";
import ReactCrop, { centerCrop, makeAspectCrop } from "react-image-crop";
import "react-image-crop/dist/ReactCrop.css";

const imageUrl =
   "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTFYqoKTu_o3Zns2yExbst2Co84Gpc2Q1RJbA&s";

const CropSection = () => {
   const [crop, setCrop] = useState({
      unit: "%",
      x: 25,
      y: 25,
      width: 50,
      height: 50,
   });

   // State to handle the shape toggle
   const [isCircle, setIsCircle] = useState(false);

   const { showPreview, imgRef, previewCanvasRef } = useCropPreview(isCircle);

   const { handleCropChange, toggleShape } = useCropShape({ showPreview, setCrop, setIsCircle, crop });

   const handleDownloadCrop = () => {
      if (!previewCanvasRef || !imgRef) return;

      const base64 = previewCanvasRef.current.toDataURL("image/png");
      const link = document.createElement("a");
      link.download = "crop image";
      link.href = base64;
      link.click();
   };

   return (
      <div style={{ padding: "20px", fontFamily: "sans-serif" }}>
         {/* SHAPE SELECTOR UI */}
         <div style={{ marginBottom: "20px", display: "flex", gap: "10px" }}>
            <button
               onClick={() => toggleShape("rect")}
               style={{
                  padding: "8px 16px",
                  background: !isCircle ? "#007bff" : "#eee",
                  color: !isCircle ? "white" : "black",
                  border: "none",
                  cursor: "pointer",
               }}
            >
               Rectangle Mode
            </button>
            <button
               onClick={() => toggleShape("circle")}
               style={{
                  padding: "8px 16px",
                  background: isCircle ? "#007bff" : "#eee",
                  color: isCircle ? "white" : "black",
                  border: "none",
                  cursor: "pointer",
               }}
            >
               Circle Mode
            </button>
         </div>

         <div style={{ display: "flex", gap: "40px", alignItems: "flex-start" }}>
            {/* EDITOR */}
            <div style={{ flex: 1 }}>
               <ReactCrop
                  crop={crop}
                  onChange={handleCropChange}
                  circularCrop={isCircle}
                  aspect={isCircle ? 1 : undefined} // Force 1:1 for circles
               >
                  <img
                     ref={imgRef}
                     src={imageUrl}
                     alt="Source"
                     crossOrigin="anonymous"
                     onLoad={() => showPreview(crop)}
                     style={{ minWidth: "100%" }}
                  />
               </ReactCrop>
            </div>

            {/* LIVE PREVIEW */}
            <div style={{ flex: 1, textAlign: "center" }}>
               <h3>{isCircle ? "Circular" : "Rectangular"} Preview</h3>
               <canvas
                  ref={previewCanvasRef}
                  style={{
                     border: "2px solid #333",
                     // THE MAGIC LINE: Toggle radius based on state
                     borderRadius: isCircle ? "50%" : "0px",
                     maxWidth: "300px",
                     maxHeight: "300px",
                     transition: "border-radius 0.3s ease", // Smooth transition
                     background: "#f0f0f0",
                  }}
               />
            </div>

            <button onClick={handleDownloadCrop} style={{ padding: "10px" }}>
               Download
            </button>
         </div>
      </div>
   );
};

export default CropSection;
