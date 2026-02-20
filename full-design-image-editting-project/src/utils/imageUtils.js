// utils/imageUtils.js

const MAX_PREVIEW_SIZE = 1200;

// utils/imageUtils.js

export const processImageUpload = (file) => {
   return new Promise((resolve, reject) => {
      // 1. Validation
      if (!file) return reject("No file provided");
      if (!file.type.startsWith("image/")) {
         return reject("Only image files are supported");
      }

      const img = new Image(); // new img tag is created
      img.src = URL.createObjectURL(file); // inserting image url in img src

      img.onload = () => {
         // 2.storing img width and height in variables
         let width = img.width;
         let height = img.height;

         //This check whether the image size is greater than
         //MAX_PREVIEW_SIZE and if yes then it will resize width and height
         if (width > MAX_PREVIEW_SIZE || height > MAX_PREVIEW_SIZE) {
            const ratio = Math.min(MAX_PREVIEW_SIZE / width, MAX_PREVIEW_SIZE / height);
            width *= ratio;
            height *= ratio;
         }

         // 3. Return the processed data
         resolve({ img, width, height });
      };

      //If there is an error then it will throw reject(message)
      img.onerror = () => reject("Something went wrong while loading the image");
   });
};

export const generateCSSFilterString = (filterData) => {
   return Object.entries(filterData)
      .map(([key, config]) => `${key}(${config.value}${config.unit})`)
      .join(" ");
};

export const DEFAULT_FILTERS = {
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
