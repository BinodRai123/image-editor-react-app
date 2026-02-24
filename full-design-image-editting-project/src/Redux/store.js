import { configureStore } from "@reduxjs/toolkit";
import counterSlice from "./slices/counter/index";
import ImageFilter from "./slices/ImageFilter/imageFilterSlicer";
import cropImage from "./slices/cropImage/cropImageSlilcer";

export const store = configureStore({
   reducer: {
      counter: counterSlice,
      imageEditor: ImageFilter,
      imageCropper: cropImage,
   },
});
