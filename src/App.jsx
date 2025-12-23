import { useEffect, useRef, useState } from "react";
import { Filter_Settings } from "./constants/filtersdata";
import RangeSlider from "./components/RangeSlider";

const App = () => {
   const [filterSettings, setFilterSettings] = useState(Filter_Settings);
   const [imageStatus, setImageStatus] = useState({ sucess: false, uploading: false, errorMessage: null });
   const [image, setImage] = useState(null);
   const canvasRef = useRef(null);
   const canvasContext = useRef(null);

   useEffect(() => {
      //Hold the context 2d value, which will not lost while rendering
      canvasContext.current = canvasRef.current?.getContext("2d");
   }, []);

   //apply filters
   const applyFilters = (filterName, value, unit) => {
      //if there is no image then return from here
      if (image == null) return;
      let allfiltervalue = "";

      filterSettings.forEach((filter) => {
         allfiltervalue += `${filter.name}(${filter.value}${filter.unit}) `;
      });

      let canvasCtx = canvasContext.current;
      canvasCtx.filter = `${allfiltervalue}`;
      canvasCtx.drawImage(image, 0, 0);
   };

   //This function Search the Filter by it's name
   //and change the value of it
   const handleFilterChange = (filterName, value, unit) => {
      applyFilters(filterName, value, unit);
      setFilterSettings((prev) => {
         return prev.map((filter) => {
            return filter.name === filterName ? { ...filter, value: value } : filter;
         });
      });
   };

   //This function upload the image into canvas
   const hangleImageUploadInCanvas = (e) => {
      const file = e.target?.files[0];
      // If user click "choose file" and cancles
      // then it will return from here
      if (!file) return;

      if (!file.type.startsWith("image/")) {
         setImageStatus({
            sucess: false,
            uploading: false,
            errorMessage: "only image file are supported",
         });
         return;
      }

      //Selecting canvas div using canvasRef
      //and making it 2d for image upload
      const canvas = canvasRef.current;
      let canvasCtx = canvasContext.current;

      //Creating new image tag
      //In Src of it will first create url path
      //from file that user has choosed
      let img = new Image();
      img.src = URL.createObjectURL(file);

      //image.onload will wait until the image fully
      //loaded in the website and after that it will
      //do set height , width and drawimage in canvas
      img.onload = () => {
         setImage(img);
         canvas.width = img.width;
         canvas.height = img.height;
         canvasCtx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };

      img.onerror = (error) => {
         console.log(error);
      };

      //This will tell the image has sucessfully uploaded
      setImageStatus((prev) => ({ ...prev, sucess: true }));
   };

   //Reset the Range input to Default
   //by rendering the first default value of filter Settings
   const FilterResetHandler = () => {
      setFilterSettings(Filter_Settings);
      if (!image) return;
      canvasContext.current.filter = "none";
      canvasContext.current.drawImage(image, 0, 0);
   };

   return (
      <main>
         <section className="container">
            <div className="left">
               <div className="left_top row">
                  <label className="btn" role="button">
                     Choose Image
                     <input type="file" onChange={hangleImageUploadInCanvas} hidden />
                  </label>

                  <button className="btn" aria-label="Reset" onClick={FilterResetHandler}>
                     Reset
                  </button>

                  <button className="btn" aria-label="Download Image">
                     Download
                  </button>
               </div>

               <div className="left_bottom">
                  <canvas
                     id="image-canvas"
                     style={{ display: imageStatus.sucess ? "block" : "none" }}
                     ref={canvasRef}
                  ></canvas>

                  {!imageStatus.sucess && (
                     <>
                        <span className="left_bottom_image_errorMessage errorMessage">
                           {imageStatus.errorMessage}
                        </span>
                        <div className="image-preview">
                           <i className="ri-image-fill"></i>
                           <p>No Image Chosen...</p>
                        </div>
                     </>
                  )}
               </div>
            </div>

            <div className="right">
               <h1>Filters</h1>

               <div className="filters">
                  {filterSettings.map((filter) => (
                     <RangeSlider
                        key={filter.name}
                        filterName={filter.name}
                        value={filter.value}
                        min={filter.min}
                        max={filter.max}
                        unit={filter.unit}
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
