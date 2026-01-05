import { useState } from "react";
import CanvasImage from "./components/CanvasImage/CanvasImage";
import Navbar from "./components/Navbar/Navbar";
import PhotoEditorSidebar from "./components/PhotoEditorSidebar/PhotoEditorSidebar";
import Featureicon from "./components/featureIcon/Featureicon";

const App = () => {
   const [activeFeature, setActiveFeature] = useState("brush");
   return (
      <section id="image-generator-page">
         <Navbar />
         <main id="main">
            <section className="main__left">
               <Featureicon activeFeature={activeFeature} setActiveFeature={setActiveFeature} />
            </section>
            <CanvasImage activeFeature={activeFeature} />
            <PhotoEditorSidebar />
         </main>
      </section>
   );
};

export default App;
