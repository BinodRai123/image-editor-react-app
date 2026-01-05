import { useContext, useState } from "react";
import { reactContext } from "../../WrapFilterData/WrapperFilters";
import DownloadIcon from "../icons/DownloadIcon";

const ExportButton = () => {
   const { originalImage, globalFilterData } = useContext(reactContext);
   // State to track export status
   const [isExporting, setIsExporting] = useState(false);

   const parsedGlobalFilterData = () => {
      let allfiltervalue = "";
      for (const key in globalFilterData) {
         allfiltervalue += `${key}(${globalFilterData[key]["value"]}${globalFilterData[key]["unit"]}) `;
      }
      return allfiltervalue;
   };

   const handleExport = async () => {
      if (!originalImage || isExporting) return;

      setIsExporting(true);

      // Wraped in a small timeout to allow the UI to update/disable the button
      // before the heavy canvas processing starts
      setTimeout(() => {
         try {
            const Image = originalImage;
            const ExportCanvas = document.createElement("canvas");
            const ctx = ExportCanvas.getContext("2d");

            ExportCanvas.width = Image.width;
            ExportCanvas.height = Image.height;

            ctx.filter = parsedGlobalFilterData();
            ctx.drawImage(Image, 0, 0, Image.width, Image.height);

            const link = document.createElement("a");
            link.download = "download-edited-image.jpg";

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
      <button
         className="btn btn-primary row"
         style={{
            "--gap": "0.2rem",
            opacity: isExporting ? 0.7 : 1,
            cursor: isExporting ? "not-allowed" : "pointer",
         }}
         onClick={handleExport}
         disabled={isExporting}
         title="Export Image"
      >
         <DownloadIcon size={"20"} color="black" />
         {isExporting ? "Exporting..." : "Export"}
      </button>
   );
};

export default ExportButton;
