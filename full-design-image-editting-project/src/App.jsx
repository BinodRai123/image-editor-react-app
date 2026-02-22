import { useEffect, useState } from "react";
import CanvasImage from "./components/CanvasImage/CanvasImage";
import Navbar from "./components/Navbar/Navbar";
import PhotoEditorSidebar from "./components/PhotoEditorSidebar/PhotoEditorSidebar";
import LeftSidebarFeatureIcons from "./components/leftSidebarFeatureIcons/leftSidebarFeatureIcon";
import { Preloader } from "./features/preloaderAnimation/Preloader.jsx";

const App = () => {
   const [activeFeature, setActiveFeature] = useState("brush");
   const [isLoading, setIsLoading] = useState(true);

   useEffect(() => {
      // 1. Wait for all assets (images, fonts, scripts) to finish loading
      const handlePageLoad = () => {
         // slight delay (2s) for a smooth transition
         // so the user doesn't see a "flicker"
         setTimeout(() => {
            setIsLoading(false);
         }, 2000);
      };

      if (document.readyState === "complete") {
         handlePageLoad();
      } else {
         window.addEventListener("load", handlePageLoad);
         return () => window.removeEventListener("load", handlePageLoad);
      }
   }, []);

   return (
      <>
         <section id="image-generator-page">
            <Navbar />
            <main id="main">
               <section className="main__left">
                  <LeftSidebarFeatureIcons
                     activeFeature={activeFeature}
                     setActiveFeature={setActiveFeature}
                  />
               </section>
               <CanvasImage activeFeature={activeFeature} />
               {activeFeature === "brush" ? <PhotoEditorSidebar /> : ""}
            </main>
         </section>
      </>
   );
};

export default App;
