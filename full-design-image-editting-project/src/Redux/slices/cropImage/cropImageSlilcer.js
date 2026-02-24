import { createSlice } from "@reduxjs/toolkit";

export const cropImage = createSlice({
   name: "cropImage",
   initialState: {
      image: {
         imageURL: null,
         width: 0,
         height: 0,
      },
   },
   reducers: {
      //Store crop Image
      setCropImage: (state, action) => {
         state.image = action.payload;
      },
   },
});

export const { setCropImage } = cropImage.actions;
export default cropImage.reducer;
