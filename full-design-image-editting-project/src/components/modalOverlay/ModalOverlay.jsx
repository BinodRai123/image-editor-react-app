const ModalOverlay = ({ modal, toggleModalOverlay, children }) => {
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
