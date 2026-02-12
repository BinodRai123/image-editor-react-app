const MenuBarButton = ({ toggleSidebar, isOpen }) => {
   return (
      <button
         className="menubar"
         onClick={toggleSidebar}
         style={{ background: "none", border: "none", padding: 0 }}
         aria-label="menubar"
      >
         <div className={`menu-container ${isOpen ? "open" : ""}`}>
            <div className="bar"></div>
            <div className="bar"></div>
            <div className="bar"></div>
         </div>
      </button>
   );
};

export default MenuBarButton;
