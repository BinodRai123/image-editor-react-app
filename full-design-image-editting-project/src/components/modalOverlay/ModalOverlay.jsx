const ModalOverlay = ({ modal, toggleModalOverlay, children }) => {
   // console.log(Children);
   return (
      <>
         {modal && (
            <div onClick={toggleModalOverlay} className="modal-overlay">
               {children}
            </div>
         )}
      </>
   );
};

export default ModalOverlay;
