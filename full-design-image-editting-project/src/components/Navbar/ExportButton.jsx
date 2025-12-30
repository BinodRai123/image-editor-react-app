import { useContext } from "react";
import { reactContext } from "../../WrapFilterData/WrapperFilters";
import DownloadIcon from "../icons/DownloadIcon";

const ExportButton = () => {
   const { canvasUrl } = useContext(reactContext);
   console.log("canvasurl", canvasUrl);
   return (
      <>
         <button
            className="btn btn-primary row"
            style={{ "--gap": "0.2rem" }}
            onClick={() => {
               if (!canvasUrl) return;
               const link = document.createElement("a");
               link.download = "download-edited-image.png";
               link.href = canvasUrl;
               link.click();
            }}
         >
            <DownloadIcon size={"20"} color="black" />
            Export
         </button>
      </>
   );
};

export default ExportButton;
