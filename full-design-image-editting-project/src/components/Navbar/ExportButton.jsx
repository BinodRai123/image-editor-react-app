import { useContext, useState, useRef } from "react";
import { reactContext } from "../../WrapFilterData/WrapperFilters";
import DownloadIcon from "../icons/DownloadIcon";
import { generateCSSFilterString } from "../../utils/imageUtils.js";
import "./exportButton.css";

const ExportButton = () => {
   const { originalImage, globalFilterData } = useContext(reactContext);
   const [isExporting, setIsExporting] = useState(false);
   const [exportProgress, setExportProgress] = useState(0); // Track 0-100%

   const [showModal, setShowModal] = useState(false);
   const [fileName, setFileName] = useState("edited-image");

   const handleExport = async () => {
      if (!originalImage || isExporting) return;

      setIsExporting(true);
      setShowModal(false);
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
         {/* Lockout Progress Overlay */}
         {isExporting && (
            <div className="export-lockout-overlay">
               <div className="progress-container">
                  <div className="spinner"></div>
                  <h2>Processing Image...</h2>
                  <div className="progress-bar-bg">
                     <div className="progress-bar-fill" style={{ width: `${exportProgress}%` }}></div>
                  </div>
                  <span>{exportProgress}%</span>
               </div>
            </div>
         )}

         {/* EXPORT BUTTON */}
         <button
            className="btn btn-primary row"
            style={{
               "--gap": "0.2rem",
               opacity: isExporting ? 0.7 : 1,
               cursor: isExporting ? "not-allowed" : "pointer",
            }}
            onClick={() => {
               if (!originalImage) return;
               setShowModal(true);
            }}
            disabled={isExporting}
            title="Export Image"
         >
            <DownloadIcon size={"20"} color="black" />
            {isExporting ? "Exporting..." : "Export"}
         </button>

         {/* Naming the folder Functionality */}
         {showModal && (
            <div className="modalOverlayStyle">
               <div className="modalContentStyle">
                  <h3 style={{ marginTop: 0 }}>Name your file</h3>
                  <p style={{ fontSize: "0.9rem", color: "#666" }}>
                     Choose a name for your edited masterpiece.
                  </p>

                  <input
                     type="text"
                     className="inputStyle"
                     value={fileName}
                     onChange={(e) => setFileName(e.target.value)}
                     onKeyDown={(e) => e.key === "Enter" && handleExport()}
                     autoFocus
                  />

                  <div
                     style={{ display: "flex", gap: "10px", justifyContent: "flex-end", marginTop: "20px" }}
                  >
                     <button
                        className="btn"
                        style={{ background: "#eee", color: "#333" }}
                        onClick={() => setShowModal(false)}
                     >
                        Cancel
                     </button>
                     <button className="btn btn-primary" onClick={handleExport}>
                        Download
                     </button>
                  </div>
               </div>
            </div>
         )}
      </>
   );
};

export default ExportButton;
