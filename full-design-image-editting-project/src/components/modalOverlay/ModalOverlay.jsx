const ModalOverlay = ({ modal, toggleModalOverlay, children }) => {
   return (
      <>
         {modal && (
            <div
               onKeyDown={(e) => e.code === "Escape" && toggleModalOverlay()}
               onClick={toggleModalOverlay}
               className="modal-overlay"
            >
               {children}
            </div>
         )}
      </>
   );
};

export default ModalOverlay;
