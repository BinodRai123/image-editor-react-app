import { parseFilters } from "../../../utils/inputRangeUtils";

const AutoEnchancerBtn = ({ setActivePreset, setGlobalFilterData, PresetData }) => {
   /* ---- Auto Enhancer button functionality ----  */
   const handleAutoEnhancer = () => {
      let min = 0,
         max = PresetData.length - 1;
      const randomNumber = Math.floor(Math.random() * (max - min + 1)) + min;
      setActivePreset(PresetData[randomNumber].name);
      const ParsedPresetStringtoObj = parseFilters(PresetData[randomNumber].style.filters);
      setGlobalFilterData(ParsedPresetStringtoObj);
   };

   return (
      <section className="sidebar-footer">
         <button onClick={handleAutoEnhancer} className="btn-auto-enhance">
            Auto Enhance
         </button>
      </section>
   );
};

export default AutoEnchancerBtn;
