import React, { useState, useCallback, useContext, useEffect } from "react";
import FilterConstants from "./filtersData";
import "./PhotoEditorSidebar.css";
import { reactContext } from "../../WrapFilterData/WrapperFilters";

// Destructuring filterData and PresetData from FilterConstants
const { filterData, PresetData } = FilterConstants;

//Importing parse functions for filter data
import { parseFilters, getInitialFilterState } from "../../utils/inputRangeUtils";
import PresetCard from "../presetCard/PresetCard";
import AutoEnchancerBtn from "./AutoEnhancerBtn/AutoEnchancerBtn";
import InputRangesCard from "./InputRangeCard/InputRangesCard";
import MenuBarButton from "../menuIcon/menuIcon";

const PhotoEditorSidebar = React.memo(() => {
   const tabs = ["All", "Filters", "Presets"];
   const { globalFilterData, setGlobalFilterData } = useContext(reactContext);
   const [activeTab, setActiveTab] = useState("All");
   const [activePreset, setActivePreset] = useState("Original");
   const [isOpen, setIsOpen] = useState(false);

   /* ---- useCallback help to memorize the function ----*/
   /* ---- on every re-render which will avoid ----*/
   /* ---- Creating new function when react re-render ----*/
   const handleRangeChange = useCallback((event) => {
      const { id, value } = event.target;

      // Use the functional update to ensure we don't have dependency issues
      // AND wrap in a transition if using React 18+ to prioritize UI responsiveness
      setGlobalFilterData((prev) => {
         if (prev[id].value === Number(value)) return prev; // Skip if no change
         return {
            ...prev,
            [id]: { ...prev[id], value: Number(value) },
         };
      });

      setActivePreset("");
   }, []);

   //Initiailzed filterdata is seeting in globalfilterdata
   //without useeffect the context cannot re-render immediatly after initialized
   useEffect(() => {
      setGlobalFilterData(() => getInitialFilterState(filterData));
   }, []);

   /* ---- Show which preset is active ----  */
   const handleActivePreset = useCallback((name, id) => {
      setActivePreset(name);
      const ParsedPresetStringtoObj = parseFilters(PresetData[id].style.filters);
      setGlobalFilterData(ParsedPresetStringtoObj);
   }, []);

   /* ---- toggle sidebar ---- */
   const toggleSidebar = () => {
      setIsOpen(!isOpen);
   };

   /* Apply Filter To Preset Card for each preset card  */
   const getPresetPreviewStyle = useCallback((preset) => {
      return {
         backgroundImage: "",
         filter: preset.style.filters ?? "gray(10px)",
         opacity: preset.style.opacity ?? 1,
      };
   }, []);

   return (
      <>
         {/* ---- Menubar Icon ----- */}
         <MenuBarButton toggleSidebar={toggleSidebar} isOpen={isOpen} />

         {/* This div is used for overloady where  */}
         {/* when client clicks outside the sidebar, it closed the sidebar */}
         {isOpen && <div className="sidebar-overlay" onClick={() => setIsOpen(!isOpen)} />}

         {/* ----- Filter & Presets Sidebar ----- */}
         <aside className={`editor-sidebar ${isOpen ? "editor-sidebar-open" : ""}`}>
            {/* Tabs */}
            <div className="tab-header">
               {tabs.map((tab) => (
                  <button
                     key={tab}
                     className={`tab-button ${activeTab === tab ? "active" : ""}`}
                     onClick={() => setActiveTab(tab)}
                     title={tab}
                  >
                     {tab}
                  </button>
               ))}
            </div>

            <div className="sidebar-content">
               {/* Adjust Tab */}
               {(activeTab === "All" || activeTab === "Filters") &&
                  //Input range Cards
                  filterData.map((section) => (
                     <InputRangesCard
                        key={section.SectionName}
                        section={section}
                        globalFilterData={globalFilterData}
                        handleRangeChange={handleRangeChange}
                     />
                  ))}

               {/* Presets */}
               {(activeTab === "All" || activeTab === "Presets") && (
                  <section className="control-group">
                     <h1 style={{ marginBottom: "0.5rem" }}>Filter Presets</h1>

                     <div className="filter-grid">
                        {/* Preset cards */}
                        {PresetData.map((preset, id) => (
                           <PresetCard
                              key={preset.name}
                              preset={preset}
                              id={id}
                              activePreset={activePreset}
                              getPresetPreviewStyle={getPresetPreviewStyle}
                              handleActivePreset={handleActivePreset}
                           />
                        ))}
                     </div>
                  </section>
               )}
            </div>

            {/* Footer */}
            {/* Auto Enhancer Button */}
            <AutoEnchancerBtn
               setActivePreset={setActivePreset}
               setGlobalFilterData={setGlobalFilterData}
               PresetData={PresetData}
            />
         </aside>
      </>
   );
});

export default PhotoEditorSidebar;
