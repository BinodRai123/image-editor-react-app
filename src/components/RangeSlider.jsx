const RangeSlider = ({ filterName, value, min, max, onChange }) => {
   return (
      <div className="filter">
         <div className="progress-counter">
            <p>{filterName}</p>
            <span>{value}</span>
         </div>
         <input
            type="range"
            value={value}
            min={min}
            max={max}
            step={1}
            onChange={(e) => onChange(filterName, Number(e.target.value))}
         />
      </div>
   );
};

export default RangeSlider;
