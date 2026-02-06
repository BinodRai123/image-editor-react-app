const ModalOverlay = ({ modal, toggleModalOverlay, children }) => {
   return (
      <>
         {modal && (
            <section
               onKeyDown={(e) => e.code === "Escape" && toggleModalOverlay()}
               onClick={toggleModalOverlay}
               className="modal-overlay"
            >
               {children}
            </section>
         )}
      </>
   );
};

export default ModalOverlay;
