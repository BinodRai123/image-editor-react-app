import React from "react";
import ModalOverlay from "../ModalOverlay";
import "./namingFileModalStyle.css";

const NamingFileModalOverlay = ({
   NamingFileModal,
   setNamingFileModal,
   fileName,
   setFileName,
   handleExport,
}) => {
   return (
      <ModalOverlay modal={NamingFileModal} toggleModalOverlay={() => setNamingFileModal(false)}>
         <div className="modalContentStyle" tabIndex={0} onClick={(e) => e.stopPropagation()}>
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
   );
};

export default NamingFileModalOverlay;
