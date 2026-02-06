import { useContext, useState } from "react";
import { reactContext } from "../../../WrapFilterData/WrapperFilters.jsx";
import DownloadIcon from "../../icons/DownloadIcon.jsx";
import { generateCSSFilterString } from "../../../utils/imageUtils.js";
import "./exportButton.css";
import ModalOverlay from "../../modalOverlay/ModalOverlay.jsx";

const ExportButton = () => {
   const { originalImage, globalFilterData } = useContext(reactContext);
   const [isExporting, setIsExporting] = useState(false);
   const [exportProgress, setExportProgress] = useState(0); // Track 0-100%

   const [NamingFileModal, setNamingFileModal] = useState(false);
   const [fileName, setFileName] = useState("edited-image");

   const handleExport = async () => {
      if (!originalImage || isExporting) return;

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
            const Image = originalImage;
            const ExportCanvas = document.createElement("canvas");
            const ctx = ExportCanvas.getContext("2d");

            // Use natural dimensions to prevent size loss
            const width = Image.naturalWidth || Image.width;
            const height = Image.naturalHeight || Image.height;
            ExportCanvas.width = width;
            ExportCanvas.height = height;

            ctx.filter = generateCSSFilterString(globalFilterData);
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
               cursor: isExporting || !originalImage ? "not-allowed" : "pointer",
            }}
            onClick={() => {
               if (!originalImage) return;
               setNamingFileModal(true);
            }}
            disabled={isExporting || !originalImage}
            title="Export Image"
         >
            <DownloadIcon size={"20"} color={`${originalImage ? "black" : "gray"}`} />
            {isExporting ? "Exporting..." : "Export"}
         </button>

         {/* Naming the folder Functionality */}
         <ModalOverlay modal={NamingFileModal} toggleModalOverlay={() => setNamingFileModal(false)}>
            <div
               className="modalContentStyle"
               tabIndex={0}
               onClick={(e) => e.stopPropagation()}
               // onKeyDown={(e) => console.log(e)}
            >
               <h3 style={{ marginTop: 0 }}>Name your file</h3>
               <p style={{ fontSize: "0.9rem", color: "#666" }}>Choose a name for your edited masterpiece.</p>

               <input
                  type="text"
                  className="inputStyle"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleExport()}
                  autoFocus
               />

               <div
                  style={{
                     display: "flex",
                     gap: "10px",
                     justifyContent: "flex-end",
                     marginTop: "20px",
                  }}
               >
                  <button
                     className="btn"
                     style={{ background: "#eee", color: "#333" }}
                     onClick={() => setNamingFileModal(false)}
                  >
                     Cancel
                  </button>
                  <button className="btn btn-primary" onClick={handleExport}>
                     Download
                  </button>
               </div>
            </div>
         </ModalOverlay>
      </>
   );
};

export default ExportButton;
