import BrushIcon from "../icons/BrushIcon";
import DownloadIcon from "../icons/DownloadIcon";

const Navbar = () => {
   return (
      <nav id="navbar" className="row" style={{ width: "100%", justifyContent: "space-between" }}>
         <div className="navbar__left">
            <div className=".navbar__left_logo row">
               <BrushIcon size="30" color="#ee9d2b" />
               <h3 style={{ letterSpacing: "-0.1rem" }}>FuturisticEditor</h3>
            </div>
            <ul className="row" style={{ "--gap": "1rem" }}>
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
         <div className="navbar__right">
            <div className="btn btn-primary row" style={{ "--gap": "0.2rem" }}>
               <DownloadIcon size={"20"} color="black" />
               Export
            </div>
         </div>
      </nav>
   );
};

export default Navbar;
