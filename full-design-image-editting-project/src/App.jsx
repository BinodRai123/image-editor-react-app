import Navbar from "./components/Navbar/Navbar";
import Featureicon from "./components/featureIcon/Featureicon";

const App = () => {
   return (
      <section id="image-generator-page">
         <Navbar />
         <main id="main">
            <section className="main__left">
               <Featureicon />
            </section>
            <section className="main__center"></section>
            <section className="main__right"></section>
         </main>
      </section>
   );
};

export default App;
