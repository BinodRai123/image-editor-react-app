import BrushIcon from "../icons/BrushIcon";
import ExportButton from "./ExportButton";

const Navbar = () => {
   return (
      <nav id="navbar" className="row" style={{ width: "100%", justifyContent: "space-between" }}>
         <div className="navbar__left">
            <div className=".navbar__left_logo row">
               <BrushIcon size="30" color="#ee9d2b" />
               <h1 style={{ letterSpacing: "-0.1rem" }}>FuturisticEditor</h1>
            </div>
            <ul className="row" style={{ "--gap": "2em" }}>
               <li>
                  <span>File</span>
               </li>
               <li>
                  <span>Edit</span>
               </li>
               <li>
                  <span>Image</span>
               </li>
            </ul>
         </div>
         <div className="navbar__right row" style={{ "--gap": "0.5rem" }}>
            <ExportButton />
         </div>
      </nav>
   );
};

export default Navbar;
