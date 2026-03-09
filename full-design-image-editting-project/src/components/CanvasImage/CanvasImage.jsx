import UnderConstruction from "../../pages/underConstruction";
import CropSection from "../../features/cropFeatureSection/CropSection.jsx";
import { DEFAULT_FILTERS } from "../../utils/imageUtils";
import BrushSection from "../../features/brushfeatureSection/BrushSection";
import ImageGeneration from "../../features/ImageGeneration/ImageGeneration";
import BeforeAfterImage from "../../features/beforeAfterImage/BeforeAfterImage";
import CanvasSketchPaint from "../../features/canvasSketchPaint/CanvasSketchPaint";

const CanvasImage = ({ activeFeature }) => {
   return (
      <>
         {/* Current Feature like: Filter, Crop, Layer and so on. */}
         {activeFeature === "brush" ? (
            <BrushSection />
         ) : activeFeature === "crop" ? (
            <CropSection />
         ) : activeFeature === "layers" ? (
            <CanvasSketchPaint />
         ) : (
            <UnderConstruction />
         )}
      </>
   );
};

export default CanvasImage;
