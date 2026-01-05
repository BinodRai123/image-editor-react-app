import React from "react";
import styles from "./underConstruction.module.css";

const UnderConstruction = () => {
   return (
      <main className={styles.container}>
         <section className={styles.content}>
            <div className={styles.iconWrapper} aria-hidden="true">
               <div className={styles.gear}>⚙️</div>
            </div>

            <h1 className={styles.title}>Under Construction</h1>
            <div className={styles.underline}></div>

            <p className={styles.description}>
               We're currently fine-tuning our platform to give you the best experience possible. Something
               great is coming your way!
            </p>

            <div className={styles.progressBox}>
               <div className={styles.progressContainer}>
                  <div className={styles.progressBar}></div>
               </div>
               <span className={styles.statusText}>Project Launching Soon</span>
            </div>

            <div className={styles.actions}>
               <a href="/" className={styles.primaryBtn}>
                  Back to Safety
               </a>
            </div>
         </section>
      </main>
   );
};

export default UnderConstruction;
