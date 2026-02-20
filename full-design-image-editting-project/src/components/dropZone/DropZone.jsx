import "./dropZone.css";

const DropZone = ({ image, isDragging, handleFileAction, uploadBtnRef, showEmptyState }) => {
   return (
      <div className="upload-zone">
         {/* Upload Button */}
         {image && (
            <label htmlFor="image-upload" className="btn upload-btn">
               {isDragging ? "Drop to Upload" : "Change Image"}
            </label>
         )}

         <input
            ref={uploadBtnRef}
            type="file"
            id="image-upload"
            onChange={(e) => handleFileAction(e.target.files[0])}
            accept="image/*"
         />

         {/* 2. THE EMPTY STATE (Show only if no image is loaded) */}
         {showEmptyState && (
            <div className={`upload-placeholder ${isDragging ? "active" : ""}`}>
               <div className="upload-icon-container">
                  <div className="icon-cloud">
                     <span className="arrow-up">↑</span>
                  </div>
               </div>
               <div className="upload-text">
                  <h1>Drag and drop or click here</h1>
                  <p>to upload your image (max 1200px)</p>
               </div>
               <label htmlFor="image-upload" className="full-area-label" />
            </div>
         )}
      </div>
   );
};

export default DropZone;
