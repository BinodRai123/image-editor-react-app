import "./errorModalStyle.css";

const ErrorModalOverlay = ({ modal, toggleModalOverlay, children, erroMessage = "something Went Wrong" }) => {
   return (
      <>
         {modal && (
            <section
               onKeyDown={(e) => e.code === "Escape" && toggleModalOverlay()}
               onClick={toggleModalOverlay}
               className="modal-overlay"
            >
               <div className="error-modal-container" onClick={(e) => e.stopPropagation()}>
                  <div className="icon-circle">
                     <span className="cross-icon">×</span>
                  </div>
                  <div className="text-group">
                     <h2 className="title">ERROR</h2>
                     <p className="description">{erroMessage}</p>
                  </div>
                  {/* Additional Feature Add, If you like */}
                  {children}
               </div>
            </section>
         )}
      </>
   );
};

export default ErrorModalOverlay;
