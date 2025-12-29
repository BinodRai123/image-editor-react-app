import React, { useState } from "react";
import "./PhotoEditorSidebar.css";
const filterData = [
   {
      SectionName: "Adjust",
      icon: "",
      controls: [
         { id: "brightness", label: "Brightness", min: -100, max: 100, defaultValue: 0, unit: "" },
         { id: "contrast", label: "Contrast", min: -100, max: 100, defaultValue: 15, unit: "", prefix: "+" },
         { id: "exposure", label: "Exposure", min: -100, max: 100, defaultValue: 20, displayValue: "+0.2" },
         { id: "saturation", label: "Saturation", min: -100, max: 100, defaultValue: 0, unit: "" },
      ],
   },
   {
      SectionName: "Effects",
      icon: "",
      controls: [
         { id: "hue", label: "Hue Rotate", min: 0, max: 360, defaultValue: 0, unit: "°" },
         { id: "blur", label: "Blur", min: 0, max: 20, defaultValue: 0, unit: "px" },
         { id: "grayscale", label: "Grayscale", min: 0, max: 100, defaultValue: 0, unit: "%" },
         { id: "sepia", label: "Sepia", min: 0, max: 100, defaultValue: 0, unit: "%" },
         { id: "opacity", label: "Opacity", min: 0, max: 100, defaultValue: 100, unit: "%" },
         { id: "invert", label: "Invert", min: 0, max: 100, defaultValue: 0, unit: "%" },
      ],
   },
];

const PhotoEditorSidebar = () => {
   const [activeTab, setActiveTab] = useState("Adjust");
   const tabs = ["Adjust", "Layers", "History"];

   const filters = [
      { name: "Original", class: "filter-original", style: {} },
      {
         name: "Vintage",
         class: "filter-vintage",
         style: { backgroundColor: "#f4e4bc", filter: "sepia(0.5)" },
      },
      {
         name: "Cold",
         class: "filter-cold",
         style: { backgroundColor: "#e0f2fe", filter: "hue-rotate(180deg)" },
      },
      { name: "Warm", class: "filter-warm", style: { backgroundColor: "#ffedd5", filter: "saturate(1.5)" } },
      {
         name: "Dramatic",
         class: "filter-dramatic",
         style: { backgroundColor: "#18181b", filter: "contrast(1.2)" },
      },
      { name: "Darken", class: "filter-darken", style: { backgroundColor: "#0f172a", opacity: 0.6 } },
   ];

   return (
      <aside className="editor-sidebar">
         {/* Tab Navigation */}
         <div className="tab-header">
            {tabs.map((tab) => (
               <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`tab-button ${activeTab === tab ? "active" : ""}`}
               >
                  {tab}
               </button>
            ))}
         </div>

         {/* Scrollable Content */}
         <div className="sidebar-content">
            {filterData.map((filter) => (
               <div key={filter.SectionName} className="card">
                  {/* SectionName Header */}
                  <div>
                     <h4>{filter.SectionName}</h4>
                  </div>

                  {/* Slider List */}
                  <div className="slider-stack">
                     {filter.controls.map((control) => (
                        <div key={control.id} className="slider-container">
                           <div className="slider-info">
                              <label>{control.label}</label>
                              <span style={{ fontSize: "0.8rem" }}>
                                 {control.displayValue ||
                                    `${control.prefix || ""}${control.defaultValue}${control.unit}`}
                              </span>
                           </div>
                           <input
                              type="range"
                              className="custom-range"
                              min={control.min}
                              max={control.max}
                              defaultValue={control.defaultValue}
                           />
                        </div>
                     ))}
                  </div>
               </div>
            ))}

            <section className="control-group">
               <h3>Filter Presets</h3>
               <div className="filter-grid">
                  {filters.map((filter) => (
                     <button
                        key={filter.name}
                        className={`preset-card ${filter.name === "Original" ? "active" : ""}`}
                     >
                        <div
                           className="filter-preview"
                           style={{ backgroundColor: filter.style.backgroundColor }}
                        >
                           <div
                              className="preview-image"
                              style={{
                                 backgroundImage: `url('https://lh3.googleusercontent.com/aida-public/AB6AXuDa1tDzYwxRMFylULhlUaolLWmx7rDkhJphX3fZt4bXLmfa054Xp0zEW-DjyEjtfbEUiSraqZGaUQ4C8D9uefXMrQ6lwVnP5WIAlXUvhf-PPVhNEBU2RJ98xsqdo6dCHfZRBqUuIKSDTGO15Q8Sp-h94B4grd22p5QuBrcst5XYAejlazFPPy68wvtDXYVSfGeb6f0LZ8tJRiOhwlvV3Kjl7j-bfWzDki2MzBNz_nSZNRSqDWYMxPMqFpkWe9PcJKm-dz7YZLY4vQ')`,
                                 filter: filter.style.filter,
                                 opacity: filter.style.opacity || 0.8,
                              }}
                           ></div>
                        </div>
                        <span style={{ fontSize: "0.7rem" }}>{filter.name}</span>
                     </button>
                  ))}
               </div>
            </section>
         </div>

         {/* Filter Presets */}

         {/* Footer Action */}
         <div className="sidebar-footer">
            <button className="btn-auto-enhance">Auto Enhance</button>
         </div>
      </aside>
   );
};

export default PhotoEditorSidebar;
