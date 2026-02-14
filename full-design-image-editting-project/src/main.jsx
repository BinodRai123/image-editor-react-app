import { createRoot } from "react-dom/client";
import "./css/index.css";
import App from "./App.jsx";
import WrapperFilters from "./WrapFilterData/WrapperFilters.jsx";
import { store } from "./Redux/store.js";
import { Provider } from "react-redux";

createRoot(document.getElementById("root")).render(
   <WrapperFilters>
      <Provider store={store}>
         <App />
      </Provider>
   </WrapperFilters>,
);
