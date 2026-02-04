import { useContext, useState, useRef } from "react";
import { reactContext } from "../../WrapFilterData/WrapperFilters";
import DownloadIcon from "../icons/DownloadIcon";
import { generateCSSFilterString } from "../../utils/imageUtils.js";
import "./exportButton.css";

const ExportButton = () => {
   const { originalImage, globalFilterData } = useContext(reactContext);
   const [isExporting, setIsExporting] = useState(false);

   // State for the Modal
   const [showModal, setShowModal] = useState(false);
   const [fileName, setFileName] = useState("edited-image");

   const handleExport = async () => {
      if (!originalImage || isExporting) return;

      setIsExporting(true);
      setShowModal(false); // Close modal immediately when processing starts

      // Wraped in a small timeout to allow the UI to update/disable the button
      // before the heavy canvas processing starts
      setTimeout(() => {
         try {
            const Image = originalImage;
            const ExportCanvas = document.createElement("canvas");
            const ctx = ExportCanvas.getContext("2d");

            ExportCanvas.width = Image.width;
            ExportCanvas.height = Image.height;

            ctx.filter = generateCSSFilterString(globalFilterData);
            ctx.drawImage(Image, 0, 0, Image.width, Image.height);

            const link = document.createElement("a");

            // Use user name or fallback
            const finalName = fileName.trim() || `image-${Date.now()}`;
            link.download = `${finalName}.jpg`;

            // OPTIMIZATION: Use image/jpeg and quality settings (0.8 - 0.9)
            // This will significantly reduce the 24MB size.
            link.href = ExportCanvas.toDataURL("image/jpeg", 0.9);

            link.click();
         } catch (error) {
            console.error("Export failed:", error);
         } finally {
            setIsExporting(false);
         }
      }, 100);
   };

   return (
      <>
         {/* Main Export Trigger */}
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

         {/* User Friendly Overlay Modal */}
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
