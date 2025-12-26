const SystemDesign = () => {
   return (
      <>
         <div className="checkerboard-container">
            <div className="bg-checkerboard"></div>

            <h1 className="title">Design System UI</h1>
            <div className="row">
               <section className="card column">
                  <div className="card_title">Typography</div>
                  <div>
                     <span>Display H1 - Space Grotesk Bold - 32px</span>
                     <h1>Capture the Future</h1>
                  </div>
                  <div>
                     <span>Display H2 - Space Grotesk Bold - 28px</span>
                     <h2>Image Properties</h2>
                  </div>
                  <div>
                     <span>Display H3 - Space Grotesk Bold - 24px</span>
                     <h3>Filters &amp; Effects</h3>
                  </div>
                  <div className="column">
                     <span>Body - Space Grotesk Regular - 16px</span>
                     <p>
                        The quick brown fox jumps over the lazy dog. This is the standard body text used for
                        descriptions, tooltips, and general interface content. It is designed for maximum
                        legibility on glassmorphic backgrounds.
                     </p>
                  </div>
               </section>

               <section className="card color-palette">
                  <h1 className="card_title">Color Palette</h1>
               </section>
            </div>

            <div className="card">
               {/* Components Header */}
               <h1 className="card_title">Components</h1>

               {/* Buttons */}
               <section>
                  <span>Buttons</span>
                  <div className="button-group">
                     <button className="btn btn-primary">Primary Action</button>
                     <button className="btn btn-outline">Outline</button>
                  </div>
                  <button className="text-link">Text Link</button>
               </section>

               {/* Inputs */}
               <section>
                  <span>Inputs</span>
                  <div className="input-wrapper">
                     <input type="text" className="input-field" placeholder="Project name..." />
                  </div>
               </section>

               {/* Controls */}
               <section>
                  <span>Controls</span>
                  <div className="card">
                     <div className="slider-header">
                        <span>Opacity</span>
                        <span className="slider-val">75%</span>
                     </div>
                     <input type="range" min="0" max="100" defaultValue="75" className="range-yellow" />
                  </div>
               </section>

               {/* Panel Style */}
               <section>
                  <span>Panel Style</span>
                  <div className="panel-style-card">
                     <div className="notification-dot"></div>
                     <div className="image-placeholder">
                        {/* SVG for Image Icon */}
                        <svg
                           width="40"
                           height="40"
                           viewBox="0 0 24 24"
                           fill="none"
                           stroke="#bcc3ce"
                           strokeWidth="2"
                        >
                           <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                           <circle cx="8.5" cy="8.5" r="1.5" />
                           <polyline points="21 15 16 10 5 21" />
                        </svg>
                     </div>
                  </div>
               </section>
            </div>
         </div>
      </>
   );
};

export default SystemDesign;
