const ModalOverlay = ({ modal, toggleModalOverlay, value }) => {
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
                  <h1 align="center">{value}</h1>
               </div>
            </div>
         )}
      </>
   );
};

export default ModalOverlay;
