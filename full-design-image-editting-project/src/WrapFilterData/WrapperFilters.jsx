import { createContext, useState } from "react";

const initialFilterData = {
   brightness: { value: 0, unit: "%" },
   contrast: { value: 15, unit: "%" },
   saturate: { value: 0, unit: "%" },
   "hue-rotate": { value: 0, unit: "°" },
   blur: { value: 0, unit: "px" },
   grayscale: { value: 0, unit: "%" },
   sepia: { value: 0, unit: "%" },
   opacity: { value: 100, unit: "%" },
   invert: { value: 0, unit: "%" },
};

export const reactContext = createContext(null);

const WrapperFilters = ({ children }) => {
   const [originalImage, setOriginalImage] = useState(null);

   return (
      <>
         <reactContext.Provider value={{ originalImage, setOriginalImage }}>{children}</reactContext.Provider>
      </>
   );
};

export default WrapperFilters;
