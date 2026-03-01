import React, { useState } from "react";
import styles from "./BeforeAfterSlider.module.css";

const BeforeAfterImage = ({ beforeImage, afterImage }) => {
   const [position, setPosition] = useState(50);

   const handleSliderChange = (e) => {
      setPosition(e.target.value);
   };

   return (
      <div className={styles.container} style={{ "--position": `${position}%` }}>
         <div className={styles.imageContainer}>
            {/* After Image (Visible in the background) */}
            <canvas
               className={`${styles.sliderImage} ${styles.imageAfter}`}
               ref={afterImage}
               alt="After"
               draggable="false"
            />

            {/* Before Image (Top layer, clipped by the slider) */}
            <img
               className={`${styles.sliderImage} ${styles.imageBefore}`}
               src={beforeImage && beforeImage}
               alt="Before"
               draggable="false"
            />
         </div>

         {/* Control Layer */}
         <input
            type="range"
            min="0"
            max="100"
            value={position}
            onChange={handleSliderChange}
            className={styles.slider}
            aria-label="Percentage of before photo shown"
         />

         {/* Visual Decorations */}
         <div className={styles.sliderLine} aria-hidden="true"></div>
         <div className={styles.sliderButton} aria-hidden="true">
            <svg
               xmlns="http://www.w3.org/2000/svg"
               width="24"
               height="24"
               fill="currentColor"
               viewBox="0 0 256 256"
            >
               <path d="M244.24,123.76l-32-32a8,8,0,0,0-11.31,11.31L220.69,123H35.31l27.76-27.76a8,8,0,0,0-11.31-11.31l-32,32a8,8,0,0,0,0,11.31l32,32a8,8,0,0,0,11.31-11.31L35.31,133H220.69l-27.76,27.76a8,8,0,0,0,11.31,11.31l32-32A8,8,0,0,0,244.24,123.76Z"></path>
            </svg>
         </div>
      </div>
   );
};

export default BeforeAfterImage;
