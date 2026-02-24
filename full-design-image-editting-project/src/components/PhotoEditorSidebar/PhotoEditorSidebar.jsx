import React, { useState, useCallback, useEffect } from "react";
import FilterConstants from "./filtersData";
import "./PhotoEditorSidebar.css";

// Destructuring filterData and PresetData from FilterConstants
const { filterData, PresetData } = FilterConstants;

//Importing parse functions for filter data
import { parseFilters, getInitialFilterState } from "../../utils/inputRangeUtils";
import PresetCard from "../presetCard/PresetCard";
import AutoEnchancerBtn from "./AutoEnhancerBtn/AutoEnchancerBtn";
import InputRangesCard from "./InputRangeCard/InputRangesCard";
import MenuBarButton from "../menuIcon/menuIcon";
import { useAppDispatch, useAppSelector } from "../../hooks/index";
import { setFilters } from "../../Redux/slices/ImageFilter/imageFilterSlicer";

const PhotoEditorSidebar = React.memo(() => {
   const tabs = ["All", "Filters", "Presets"];
   const [activeTab, setActiveTab] = useState("All");
   const [activePreset, setActivePreset] = useState("Original");
   const [isOpen, setIsOpen] = useState(false);
   const filterDatas = useAppSelector((state) => state.imageEditor.filters);
   const dispatch = useAppDispatch();

   /* ---- Show which preset is active ----  */
   const handleActivePreset = useCallback((name, id) => {
      setActivePreset(name);
      const ParsedPresetStringtoObj = parseFilters(PresetData[id].style.filters);
      dispatch(setFilters(ParsedPresetStringtoObj));
   }, []);

   /* ---- toggle sidebar ---- */
   const toggleSidebar = () => {
      setIsOpen(!isOpen);
   };

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
                        dispatch={dispatch}
                        useAppSelector={useAppSelector}
                        setActivePreset={setActivePreset}
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
                              handleActivePreset={handleActivePreset}
                           />
                        ))}
                     </div>
                  </section>
               )}
            </div>

            {/* Footer */}
            {/* Auto Enhancer Button */}
            <AutoEnchancerBtn setActivePreset={setActivePreset} dispatch={dispatch} PresetData={PresetData} />
         </aside>
      </>
   );
});

export default PhotoEditorSidebar;
