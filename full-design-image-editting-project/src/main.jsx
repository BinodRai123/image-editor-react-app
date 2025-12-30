import { createRoot } from "react-dom/client";
import "./css/index.css";
import App from "./App.jsx";
import WrapperFilters from "./WrapFilterData/WrapperFilters.jsx";

createRoot(document.getElementById("root")).render(
   <WrapperFilters>
      <App />
   </WrapperFilters>
);
