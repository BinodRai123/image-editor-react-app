import UnderConstruction from "../../pages/underConstruction";
import CropSection from "../../features/cropFeatureSection/CropSection.jsx";
import { DEFAULT_FILTERS } from "../../utils/imageUtils";
import BrushSection from "../../features/brushfeatureSection/BrushSection";
import ReduxSection from "../../features/ReduxDemo/ReduxSection";

const CanvasImage = ({ activeFeature }) => {
   return (
      <>
         {/* Current Feature like: Filter, Crop, Layer and so on. */}
         {activeFeature === "brush" ? (
            <BrushSection />
         ) : activeFeature === "crop" ? (
            <CropSection />
         ) : activeFeature === "layers" ? (
            <ReduxSection />
         ) : (
            <UnderConstruction />
         )}
      </>
   );
};

export default CanvasImage;
