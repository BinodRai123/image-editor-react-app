//Create a base for Each Svg for maintanability
const IconBase = ({ size = 24, color = "currentColor", viewBox, children }) => {
   return (
      <svg
         width={size}
         height={size}
         viewBox={viewBox}
         fill={color}
         xmlns="http://www.w3.org/2000/svg"
         aria-hidden="true"
      >
         {children}
      </svg>
   );
};

export default IconBase;
