import React, { useEffect, useState } from "react";
import "./ImageGenerationStyle.css";

const ImageGeneration = () => {
   const [prompt, setPrompt] = useState("");
   const [imageUrl, setImageUrl] = useState(null);
   const [loading, setLoading] = useState(false);
   const [error, setError] = useState(null);

   // Load Puter.js Script
   useEffect(() => {
      if (!window.puter) {
         const script = document.createElement("script");
         script.src = "https://js.puter.com/v2/";
         script.async = true;
         document.body.appendChild(script);
      }
   }, []);

   const generateImage = async (e) => {
      e.preventDefault();
      if (!prompt) return;

      setLoading(true);
      setError(null);

      try {
         // Puter's AI image generation method
         const image = await window.puter.ai.txt2img(prompt);

         // txt2img returns a Blob/Image source
         const url = image.src;
         setImageUrl(url);
      } catch (err) {
         console.error(err);
         setError("Failed to generate image. Please try again.");
      } finally {
         setLoading(false);
      }
   };

   return (
      <div style={styles.container}>
         <div style={styles.card}>
            <h2 style={styles.title}>AI Image Studio</h2>
            <p style={styles.subtitle}>Transform your thoughts into visuals</p>

            <form onSubmit={generateImage} style={styles.form}>
               <input
                  type="text"
                  placeholder="A futuristic city in the clouds..."
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  style={styles.input}
               />
               <button
                  type="submit"
                  disabled={loading}
                  style={loading ? { ...styles.button, opacity: 0.7 } : styles.button}
               >
                  {loading ? "Creating..." : "Generate"}
               </button>
            </form>

            {error && <p style={styles.error}>{error}</p>}

            <div style={styles.imageContainer}>
               {loading ? (
                  <div style={styles.skeleton}>Generating your masterpiece...</div>
               ) : imageUrl ? (
                  <img src={imageUrl} alt={prompt} style={styles.image} />
               ) : (
                  <div style={styles.placeholder}>Your image will appear here</div>
               )}
            </div>
         </div>
      </div>
   );
};

// --- Minimalist "Human" Styling ---
const styles = {
   container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
      backgroundColor: "#f9fafb",
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
   },
   card: {
      width: "100%",
      maxWidth: "500px",
      padding: "2rem",
      backgroundColor: "#ffffff",
      borderRadius: "24px",
      boxShadow: "0 10px 25px rgba(0,0,0,0.05)",
      textAlign: "center",
   },
   title: {
      fontSize: "1.5rem",
      fontWeight: "700",
      color: "#111827",
      marginBottom: "0.5rem",
   },
   subtitle: {
      fontSize: "0.9rem",
      color: "#6b7280",
      marginBottom: "1.5rem",
   },
   form: {
      display: "flex",
      gap: "10px",
      marginBottom: "1.5rem",
   },
   input: {
      flex: 1,
      padding: "12px 16px",
      borderRadius: "12px",
      border: "1px solid #e5e7eb",
      fontSize: "1rem",
      outline: "none",
      transition: "border-color 0.2s",
   },
   button: {
      padding: "12px 24px",
      backgroundColor: "#000",
      color: "#fff",
      border: "none",
      borderRadius: "12px",
      fontWeight: "600",
      cursor: "pointer",
      transition: "transform 0.1s",
   },
   imageContainer: {
      marginTop: "1rem",
      width: "100%",
      aspectRatio: "1/1",
      borderRadius: "16px",
      overflow: "hidden",
      backgroundColor: "#f3f4f6",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
   },
   image: {
      width: "100%",
      height: "100%",
      objectFit: "cover",
      animation: "fadeIn 0.5s ease-in-out",
   },
   placeholder: {
      color: "#9ca3af",
      fontSize: "0.9rem",
   },
   skeleton: {
      color: "#6b7280",
      fontSize: "0.9rem",
      fontStyle: "italic",
   },
   error: {
      color: "#ef4444",
      fontSize: "0.8rem",
      marginBottom: "1rem",
   },
};

export default ImageGeneration;
