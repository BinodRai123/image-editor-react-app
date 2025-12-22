import { useState } from "react";
import { Filter_Settings } from "./constants/filtersdata";
import RangeSlider from "./components/RangeSlider";

const App = () => {
   const [filterSettings, setFilterSettings] = useState(Filter_Settings);

   const handleFilterChange = (filterName, value) => {
      setFilterSettings((prev) => {
         return prev.map((filter) => {
            return filter.name === filterName ? { ...filter, value: value } : filter;
         });
      });
   };

   const FilterResetHandler = () => {
      setFilterSettings(Filter_Settings);
   };

   return (
      <main>
         <section className="container">
            <div className="left">
               <div className="left_top row">
                  <label className="btn" role="button">
                     Choose Image
                     <input type="file" hidden />
                  </label>

                  <button className="btn" aria-label="Reset" onClick={FilterResetHandler}>
                     Reset
                  </button>

                  <button className="btn" aria-label="Download Image">
                     Download
                  </button>
               </div>

               <div className="left_bottom">
                  <div className="image-preview">
                     <i className="ri-image-fill"></i>
                     <p>No Image Chosen...</p>
                  </div>
               </div>
            </div>

            <div className="right">
               <h1>Filters</h1>

               <div class="filters">
                  {filterSettings.map((filter) => (
                     <RangeSlider
                        key={filter.name}
                        filterName={filter.name}
                        value={filter.value}
                        min={filter.min}
                        max={filter.max}
                        onChange={handleFilterChange}
                     />
                  ))}
               </div>
            </div>
         </section>
      </main>
   );
};

export default App;
