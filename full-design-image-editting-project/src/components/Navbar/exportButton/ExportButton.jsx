import { useState } from "react";
import DownloadIcon from "../../icons/DownloadIcon.jsx";
import { generateCSSFilterString } from "../../../utils/imageUtils.js";
import ModalOverlay from "../../modalOverlay/ModalOverlay.jsx";
import { useAppSelector } from "../../../hooks/index.js";
import NamingFileModalOverlay from "../../../components/modalOverlay/namingfileModalOverlay/NamingFileModalOverlay.jsx";
import "./exportButton.css";

const ExportButton = () => {
   const [isExporting, setIsExporting] = useState(false);
   const [exportProgress, setExportProgress] = useState(0); // Track 0-100%

   const [NamingFileModal, setNamingFileModal] = useState(false);
   const [fileName, setFileName] = useState("edited-image");

   //image and filterDAta
   const { imageURL, originalImageHeight, originalImageWidth } = useAppSelector(
      (state) => state.imageEditor.currentImage,
   );
   const filterData = useAppSelector((state) => state.imageEditor.filters);

   const handleExport = async () => {
      if (!imageURL || isExporting) return;

      setIsExporting(true);
      setNamingFileModal(false);
      setExportProgress(0);

      // 1. Start a fake progress interval to make the UI feel alive
      const progressInterval = setInterval(() => {
         setExportProgress((prev) => {
            if (prev >= 95) {
               clearInterval(progressInterval);
               return 95;
            }
            return prev + 5;
         });
      }, 50);

      setTimeout(() => {
         try {
            const Image = document.createElement("img");
            Image.src = imageURL;

            const ExportCanvas = document.createElement("canvas");
            const ctx = ExportCanvas.getContext("2d");

            // Use natural dimensions to prevent size loss
            const width = originalImageWidth || Image.width;
            const height = originalImageHeight || Image.height;
            ExportCanvas.width = width;
            ExportCanvas.height = height;

            ctx.filter = generateCSSFilterString(filterData);
            ctx.drawImage(Image, 0, 0, width, height);

            const link = document.createElement("a");
            const finalName = fileName.trim() || `image-${Date.now()}`;
            link.download = `${finalName}.jpg`;

            // Using 0.95 to keep quality high (closer to your 16mb original)
            link.href = ExportCanvas.toDataURL("image/jpeg", 0.95);

            setExportProgress(100); // Finish progress

            setTimeout(() => {
               link.click();
               clearInterval(progressInterval);
               setIsExporting(false);
               setExportProgress(0);
            }, 300); // Brief pause at 100% for visual satisfaction
         } catch (error) {
            console.error("Export failed:", error);
            clearInterval(progressInterval);
            setIsExporting(false);
         }
      }, 500); // Slight delay so user sees the "Exporting" state start
   };

   return (
      <>
         {/* Exporting Progress Overlay */}
         {isExporting && (
            <>
               <h2>Processing Image...</h2>
               <div className="export-lockout-overlay">
                  <div className="progress-container">
                     <div className="spinner"></div>
                     <div className="progress-bar-bg">
                        <div className="progress-bar-fill" style={{ width: `${exportProgress}%` }}></div>
                     </div>
                     <span>{exportProgress}%</span>
                  </div>
               </div>
            </>
         )}

         {/* EXPORT BUTTON */}
         <button
            className="btn btn-primary row"
            style={{
               "--gap": "0.2rem",
               cursor: isExporting || !imageURL ? "not-allowed" : "pointer",
            }}
            onClick={() => {
               if (!imageURL) return;
               setNamingFileModal(true);
            }}
            disabled={isExporting || !imageURL}
            title="Export Image"
         >
            <DownloadIcon size={"20"} color={`${imageURL ? "black" : "gray"}`} />
            {isExporting ? "Exporting..." : "Export"}
         </button>

         {/* Naming the folder Functionality */}
         <NamingFileModalOverlay
            NamingFileModal={NamingFileModal}
            setNamingFileModal={setNamingFileModal}
            fileName={fileName}
            setFileName={setFileName}
            handleExport={handleExport}
         />
      </>
   );
};

export default ExportButton;
