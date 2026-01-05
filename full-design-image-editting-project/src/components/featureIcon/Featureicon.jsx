import { useState } from "react";
import BrushIcon from "../icons/BrushIcon";
import CropIcon from "../icons/CropIcon";
import LayersIcon from "../icons/Layers";
import TuneIcon from "../icons/TuneIcon";

const allIcon = [
   { name: "brush", icon: BrushIcon },
   { name: "crop", icon: CropIcon },
   { name: "layers", icon: LayersIcon },
   { name: "tune", icon: TuneIcon },
];

const Featureicon = ({ activeFeature, setActiveFeature }) => {
   return (
      <>
         <div className="main__left__features">
            {allIcon.map((feature, id) => {
               return (
                  <div
                     key={id}
                     className={
                        activeFeature === allIcon.name
                           ? "feature-icon active-feature-icon"
                           : "feature-icon inactive-feature-icon"
                     }
                     onClick={() => setActiveFeature(feature.name)}
                  >
                     <feature.icon size="30" color={activeFeature === feature.name ? "#EE9D2B" : "#111827"} />
                  </div>
               );
            })}
         </div>
      </>
   );
};

export default Featureicon;
