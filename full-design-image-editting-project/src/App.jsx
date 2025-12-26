import BrushIcon from "./components/icons/BrushIcon";
import CropIcon from "./components/icons/CropIcon";
import SettingIcon from "./components/icons/SettingIcon";
import Layers from "./components/icons/Layers";
import TuneIcon from "./components/icons/TuneIcon";
import UndoIcon from "./components/icons/UndoIcon";
import DownloadIcon from "./components/icons/DownloadIcon";

const App = () => {
   return (
      <>
         <BrushIcon size={"50"} color="red" />
         <SettingIcon size="50" color="gray" />
         <CropIcon size="50" color="gray" />
         <Layers size="50" color="black" />
         <TuneIcon size="50" color="orange" />
         <UndoIcon size="50" color="orange" />
         <DownloadIcon size="50" color="green" />
      </>
   );
};

export default App;
