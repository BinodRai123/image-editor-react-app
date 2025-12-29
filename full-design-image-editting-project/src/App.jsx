import Navbar from "./components/Navbar/Navbar";
import PhotoEditorSidebar from "./components/PhotoEditorSidebar/PhotoEditorSidebar";
import Featureicon from "./components/featureIcon/Featureicon";

const App = () => {
   return (
      <section id="image-generator-page">
         <Navbar />
         <main id="main">
            <section className="main__left">
               <Featureicon />
            </section>
            <section className="main__center" style={{ flexGrow: "1" }}></section>
            <PhotoEditorSidebar />
         </main>
      </section>
   );
};

export default App;
