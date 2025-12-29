import CanvasImage from "./components/CanvasImage/CanvasImage";
import Navbar from "./components/Navbar/Navbar";
import PhotoEditorSidebar from "./components/PhotoEditorSidebar/PhotoEditorSidebar";
import Featureicon from "./components/featureIcon/Featureicon";

const App = () => {
   console.log("rendered");
   return (
      <section id="image-generator-page">
         <Navbar />
         <main id="main">
            <section className="main__left">
               <Featureicon />
            </section>
            <CanvasImage />
            <PhotoEditorSidebar />
         </main>
      </section>
   );
};

export default App;
