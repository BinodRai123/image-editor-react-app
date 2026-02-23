import { createSlice } from "@reduxjs/toolkit";

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

export const ImageFilter = createSlice({
   name: "ImageFilter",
   initialState: {
      currentImage: null,
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

      // 3. Action to reset everything (No payload needed here!)
      resetEditor: (state) => {
         state.filters = initialFilterData;
      },
   },
});

export const { setCurrentImage, updateFilterValue, resetEditor } = ImageFilter.actions;
export default ImageFilter.reducer;
