import { useCallback } from "react";

const PresetCard = ({ preset, id, activePreset, handleActivePreset }) => {
   /* Apply Filter To Preset Card for each preset card  */
   const getPresetPreviewStyle = useCallback((preset) => {
      return {
         backgroundImage: "",
         filter: preset.style.filters ?? "gray(10px)",
         opacity: preset.style.opacity ?? 1,
      };
   }, []);

   return (
      <button
         className={`preset-card ${preset.name === activePreset ? "active" : ""}`}
         onClick={() => handleActivePreset(preset.name, id)}
      >
         <div className="filter-preview" style={{ backgroundColor: preset.style.backgroundColor }}>
            <div
               className="preview-image"
               style={getPresetPreviewStyle(preset)}
               alt="Preset Background Image"
            />
         </div>

         <span style={{ fontSize: "0.7rem" }}>{preset.name}</span>
      </button>
   );
};

export default PresetCard;
