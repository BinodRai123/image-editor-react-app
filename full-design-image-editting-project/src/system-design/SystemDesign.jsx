import { useState } from "react";

const SystemDesign = () => {
   const [modal, setModal] = useState(false);

   const toggleModalOverlay = () => {
      setModal(!modal);
   };

   return (
      <>
         {modal && (
            <div onClick={toggleModalOverlay} className="modal-overlay">
               {/*
            //e.stopPropagation() prevent it from clicking 
            //while it's parent has onClick //which is called
            preventing event bubbling 
            */}
               <div className="modal" onClick={(e) => e.stopPropagation()}>
                  <h1>hello everyone</h1>
                  <h2>this is me</h2>
               </div>
            </div>
         )}

         <a className="text-link" href="#">
            Text Link
         </a>

         <button onClick={toggleModalOverlay} className="btn btn-primary">
            Export
         </button>

         <input className="input" placeholder="input" type="text" />

         <div className="card">
            <input className="input" placeholder="input" type="text" />
            <input className="input" placeholder="input" type="text" />
         </div>
      </>
   );
};

export default SystemDesign;
