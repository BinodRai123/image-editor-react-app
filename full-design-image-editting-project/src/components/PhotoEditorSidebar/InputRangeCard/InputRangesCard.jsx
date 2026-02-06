const InputRangesCard = ({ section, globalFilterData, handleRangeChange }) => {
   return (
      <div className="card">
         <div className="row">
            {section.icon ? <>{section.icon}</> : "error"}
            <h1>{section.SectionName}</h1>
         </div>

         <div className="slider-stack">
            {section.controls.map((control) => (
               <div key={control.id} className="slider-container">
                  <div className="slider-info">
                     <label htmlFor={`${control.id}`} aria-label={`${control.id}`}>
                        {control.label}
                     </label>
                     <span>{globalFilterData[`${control?.id}`]["value"]}</span>
                  </div>

                  <input
                     id={control.id}
                     type="range"
                     className="custom-range"
                     min={control.min}
                     max={control.max}
                     value={globalFilterData[`${control.id}`]["value"]}
                     onChange={handleRangeChange}
                  />
               </div>
            ))}
         </div>
      </div>
   );
};

export default InputRangesCard;
