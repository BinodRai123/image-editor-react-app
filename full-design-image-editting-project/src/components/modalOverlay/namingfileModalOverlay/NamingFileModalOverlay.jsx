import React from "react";
import ModalOverlay from "../ModalOverlay";
import "./namingFileModalStyle.css";

// Add any new formats here in the future
const FORMAT_OPTIONS = [
   { id: "jpg", label: "JPG" },
   { id: "png", label: "PNG" },
   { id: "webp", label: "WebP" },
];

const NamingFileModalOverlay = ({
   NamingFileModal,
   setNamingFileModal,
   fileName,
   setFileName,
   fileFormat,
   setFileFormat,
   handleExport,
}) => {
   return (
      <ModalOverlay modal={NamingFileModal} toggleModalOverlay={() => setNamingFileModal(false)}>
         <div className="modalContentStyle" tabIndex={0} onClick={(e) => e.stopPropagation()}>
            <h3 style={{ marginTop: 0, marginBottom: "8px" }}>Export Image</h3>
            <p style={{ fontSize: "0.85rem", color: "#666", marginBottom: "20px" }}>
               Choose your filename and preferred image format.
            </p>

            {/* FILENAME SECTION */}
            <div className="modal-field-group">
               <label className="field-label">File Name</label>
               <input
                  type="text"
                  className="inputStyle"
                  value={fileName}
                  onChange={(e) => setFileName(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleExport()}
                  autoFocus
               />
            </div>

            {/* FORMAT GRID SECTION */}
            <div className="modal-field-group" style={{ marginTop: "20px" }}>
               <label className="field-label">Format</label>
               <div className="format-grid-container">
                  {FORMAT_OPTIONS.map((option) => (
                     <button
                        key={option.id}
                        type="button"
                        className={`format-card ${fileFormat === option.id ? "active" : ""}`}
                        onClick={() => setFileFormat(option.id)}
                     >
                        <span className="format-text">{option.label}</span>
                        {/* This dot only shows when active for extra flair */}
                        {fileFormat === option.id && <div className="active-indicator" />}
                     </button>
                  ))}
               </div>
            </div>

            {/* MODAL FOOTER */}
            <div className="modal-footer-actions">
               <button className="btn btn-cancel" onClick={() => setNamingFileModal(false)}>
                  Cancel
               </button>
               <button className="btn btn-primary" onClick={handleExport}>
                  Download .{fileFormat}
               </button>
            </div>
         </div>
      </ModalOverlay>
   );
};

export default NamingFileModalOverlay;
