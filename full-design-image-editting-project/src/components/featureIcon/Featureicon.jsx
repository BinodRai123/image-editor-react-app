import { useState } from "react";
import BrushIcon from "../icons/BrushIcon";
import CropIcon from "../icons/CropIcon";
import LayersIcon from "../icons/Layers";
import TuneIcon from "../icons/TuneIcon";

const allIcon = [BrushIcon, CropIcon, LayersIcon, TuneIcon];

const Featureicon = () => {
   const [activeIconId, setActiveIconId] = useState(0);
   return (
      <>
         <div className="main__left__features">
            {allIcon.map((Icon, id) => {
               return (
                  <div
                     key={id}
                     className={
                        activeIconId === id
                           ? "feature-icon active-feature-icon"
                           : "feature-icon inactive-feature-icon"
                     }
                     onClick={() => setActiveIconId(id)}
                  >
                     <Icon size="30" color={activeIconId == id ? "#EE9D2B" : "#111827"} />
                  </div>
               );
            })}
         </div>
      </>
   );
};

export default Featureicon;
