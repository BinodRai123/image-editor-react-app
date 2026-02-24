import { updateFilterValue } from "../../../Redux/slices/ImageFilter/imageFilterSlicer";
import { useCallback } from "react";

const InputRangesCard = ({ section, setActivePreset, dispatch, useAppSelector }) => {
   const filterData = useAppSelector((state) => state.imageEditor.filters);

   /* ---- useCallback help to memorize the function ----*/
   /* ---- on every re-render which will avoid ----*/
   /* ---- Creating new function when react re-render ----*/
   const handleRangeChange = useCallback(({ event, name }) => {
      const { id, value } = event.target;

      //Update the Filter Data in the Redux Filter Data
      dispatch(updateFilterValue({ name: id, value: value }));

      setActivePreset("");
   }, []);

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
                     <span>{filterData[`${control?.id}`]["value"]}</span>
                  </div>

                  <input
                     id={control.id}
                     type="range"
                     className="custom-range"
                     min={control.min}
                     max={control.max}
                     value={filterData[`${control?.id}`]["value"]}
                     onChange={(event) => handleRangeChange({ event, name: control.label })}
                  />
               </div>
            ))}
         </div>
      </div>
   );
};

export default InputRangesCard;
