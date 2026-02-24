import { createSlice } from "@reduxjs/toolkit";

const initialFilterData = {
   brightness: { value: 100, unit: "%" },
   contrast: { value: 100, unit: "%" },
   saturate: { value: 100, unit: "%" },
   "hue-rotate": { value: 0, unit: "deg" },
   blur: { value: 0, unit: "px" },
   grayscale: { value: 0, unit: "%" },
   sepia: { value: 0, unit: "%" },
   opacity: { value: 100, unit: "%" },
   invert: { value: 0, unit: "%" },
};

export const ImageFilter = createSlice({
   name: "ImageFilter",
   initialState: {
      currentImage: {
         imageURL: null,
         width: 0,
         height: 0,
         originalImageWidth: 0,
         originalImageHeight: 0,
      },
      filters: initialFilterData,
   },
   reducers: {
      //1. Action to save the current image
      setCurrentImage: (state, action) => {
         state.currentImage = action.payload;
      },

      // 2. Action to update a specific filter value
      // Payload will look like: { name: 'brightness', value: 20 }
      updateFilterValue: (state, action) => {
         const { name, value } = action.payload;
         if (state.filters[name]) {
            state.filters[name].value = value;
         }
      },

      setFilters: (state, action) => {
         // This replaces the entire filters object with the payload
         state.filters = action.payload;
      },

      // 3. Action to reset everything (No payload needed here!)
      resetEditor: (state) => {
         state.filters = initialFilterData;
      },
   },
});

export const { setCurrentImage, updateFilterValue, resetEditor, setFilters } = ImageFilter.actions;
export default ImageFilter.reducer;
