import { createContext, useState } from "react";

const initialFilterData = {
   brightness: 0,
   contrast: 15,
   exposure: 20,
   saturation: 0,
   hue: 0,
   blur: 0,
   grayscale: 0,
   sepia: 0,
   opacity: 100,
   invert: 0,
};

export const reactContext = createContext(null);

const WrapperFilters = ({ children }) => {
   const [globalFilterData, setGlobalFilterData] = useState(initialFilterData);
   return (
      <>
         <reactContext.Provider value={[globalFilterData, setGlobalFilterData]}>
            {children}
         </reactContext.Provider>
      </>
   );
};

export default WrapperFilters;
