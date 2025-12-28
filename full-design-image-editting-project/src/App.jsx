import { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import BrushIcon from "./components/icons/BrushIcon";
import CropIcon from "./components/icons/CropIcon";
import LayersIcon from "./components/icons/Layers";
import TuneIcon from "./components/icons/TuneIcon";

const allIcon = [BrushIcon, CropIcon, LayersIcon, TuneIcon];

const App = () => {
   const [activeIconId, setActiveIconId] = useState(0);

   return (
      <section id="image-generator-page">
         <Navbar />
         <main id="main">
            <section className="main__left">
               <div className="main__left__features">
                  {allIcon.map((Icon, id) => {
                     return (
                        <div
                           key={id}
                           className={
                              activeIconId === id ? "feature-icon active-feature-icon" : "feature-icon"
                           }
                           onClick={() => setActiveIconId(id)}
                        >
                           <Icon size="30" color="hsla(34, 100%, 50%, 1.00)" />
                        </div>
                     );
                  })}
               </div>
            </section>
            <section className="main__center"></section>
            <section className="main__right"></section>
         </main>
      </section>
   );
};

export default App;
