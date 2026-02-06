const PresetCard = ({ preset, id, activePreset, getPresetPreviewStyle, handleActivePreset }) => {
   return (
      <button
         key={preset.name}
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
