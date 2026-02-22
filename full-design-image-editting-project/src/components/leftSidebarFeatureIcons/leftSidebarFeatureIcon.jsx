import BrushIcon from "../icons/BrushIcon";
import CropIcon from "../icons/CropIcon";
import LayersIcon from "../icons/Layers";
import TuneIcon from "../icons/TuneIcon";
import "./leftsidebar.css";

const allIcon = [
   { name: "brush", icon: BrushIcon, title: "Image Filter" },
   { name: "crop", icon: CropIcon, title: "under construction" },
   { name: "layers", icon: LayersIcon, title: "under construction" },
   { name: "tune", icon: TuneIcon, title: "under construction" },
];

const LeftSidebarFeatureIcons = ({ activeFeature, setActiveFeature }) => {
   return (
      <>
         <div className="main__left__features">
            {allIcon.map((feature, id) => {
               return (
                  <a
                     key={id}
                     href="#"
                     title={feature.title}
                     className={
                        activeFeature === allIcon.name
                           ? "feature-icon active-feature-icon"
                           : "feature-icon inactive-feature-icon"
                     }
                     onClick={() => setActiveFeature(feature.name)}
                  >
                     <feature.icon size="30" color={activeFeature === feature.name ? "#EE9D2B" : "#111827"} />
                  </a>
               );
            })}
         </div>
      </>
   );
};

export default LeftSidebarFeatureIcons;
