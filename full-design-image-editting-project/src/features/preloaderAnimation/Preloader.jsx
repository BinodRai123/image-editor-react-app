export const Preloader = () => (
   <div style={styles.container}>
      {/* Use <img> for GIFs, and use the path relative to the public folder */}
      <video autoPlay muted loop playsInline style={{ width: "150px", height: "auto" }}>
         {/* Ensure this file is in your /public/ folder */}
         <source src="/preloader-animation/Image Loader.mp4" type="video/mp4" />
      </video>
      <h2 style={styles.text}>Initializing Creative Suite...</h2>
   </div>
);

/* ---- Video Styles ---- */
const styles = {
   container: {
      position: "fixed",
      top: 0,
      left: 0,
      width: "100vw",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#ffffff", // Match your site background
      zIndex: 9999,
   },
   text: {
      color: "black",
      marginTop: "20px",
      fontFamily: "sans-serif",
      letterSpacing: "2px",
   },
};
