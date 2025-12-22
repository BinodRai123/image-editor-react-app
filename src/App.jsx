const App = () => {
   return (
      <>
         <main>
            <section className="container">
               <div class="left">
                  <div class="left_top row">
                     <label for="choose image" className="btn" role="button" aria-label="Choose Image">
                        Choose Image
                        <input type="file" id="choose image" hidden />
                     </label>
                     <button className="btn" role="button" aria-label="Reset">
                        Reset
                     </button>
                     <button className="btn" role="button" aria-label="Download Image">
                        Download Image
                     </button>
                  </div>
                  <div class="left_bottom"></div>
               </div>
            </section>
         </main>
      </>
   );
};

export default App;
