import React, { useCallback, useEffect, useRef, useState } from "react";
import "./canvasImage.css";
import ModalOverlay from "../modalOverlay/ModalOverlay";

const CanvasImage = () => {
   const [imageStauts, setImageStatus] = useState({ sucess: false, uploading: false, errorMessage: null });
   const [image, setImage] = useState(null);
   //holds the canvas element
   const canvasRef = useRef(null);
   const canvasContext = useRef(null);
   const [modal, setModal] = useState(false);
   console.log(modal);

   const toggleModalOverlay = () => {
      setModal(!modal);
   };

   useEffect(() => {
      //It hold the value of getContext("2d"), which will not
      //lost while re-rendering
      canvasContext.current = canvasRef.current?.getContext("2d");
   }, []);

   const hangleImageUploadInCanvas = (e) => {
      const file = e.target?.files[0];
      // If user click "choose file" and cancles
      // then it will return from here
      if (!file) return;

      //retrun if user donot select image file
      //and update the setimagestatus
      if (!file.type.startsWith("image/")) {
         //input file store here to reset
         //when another file is selected
         const input = e.target;
         setImageStatus({
            sucess: false,
            uploading: false,
            errorMessage: "only image file are supported",
         });
         setModal(true);

         //Reset file input
         input.value = "";
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
      //set height , width and drawimage in canvas
      img.onload = () => {
         setImage(img);
         canvas.width = img.width;
         canvas.height = img.height;
         canvasCtx.drawImage(img, 0, 0, canvas.width, canvas.height);
      };

      img.onerror = () => {
         setImageStatus((prev) => ({ ...prev, errorMessage: "something went wrong" }));
      };

      //This will tell the image has sucessfully uploaded
      setImageStatus((prev) => ({ ...prev, sucess: true }));
   };

   return (
      <>
         <section className="canvas-image-container">
            {/* Canvas element donot show until imageStaus is true */}
            <canvas
               id="canvas-image-preview"
               style={{ display: imageStauts.sucess == true ? "block" : "none" }}
               ref={canvasRef}
            ></canvas>
            {/* Upload Image Button */}
            <div>
               <label htmlFor="image-upload" className="btn upload-btn">
                  Upload Image
               </label>
               {/* //hides the input field and style 
                  //the label for uploading images */}
               <input type="file" id="image-upload" onChange={hangleImageUploadInCanvas} />
            </div>

            {/* Error Message */}
            {modal ? (
               <div onClick={toggleModalOverlay} className="modal-overlay">
                  {/*
                  //e.stopPropagation() prevent it from clicking 
                  //while it's parent has onClick //which is called
                  preventing event bubbling 
                  */}
                  <div className="modal" onClick={(e) => e.stopPropagation()}>
                     <h1 align="center">{imageStauts.errorMessage}</h1>
                  </div>
               </div>
            ) : (
               <div></div>
            )}
         </section>
      </>
   );
};

export default CanvasImage;
