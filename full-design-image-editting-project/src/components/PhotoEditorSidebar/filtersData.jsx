import BrushIcon from "../icons/BrushIcon";
import TuneIcon from "../icons/TuneIcon";
const filterData = [
   {
      SectionName: "Adjust",
      icon: <TuneIcon size={25} color="#ee9d2b" />,
      controls: [
         {
            id: "brightness",
            label: "Brightness",
            min: 0,
            max: 200,
            defaultValue: 100,
            unit: "%",
         },
         {
            id: "contrast",
            label: "Contrast",
            min: 0,
            max: 200,
            defaultValue: 100,
            unit: "%",
         },
         {
            id: "saturate",
            label: "saturation",
            min: 0,
            max: 200,
            defaultValue: 100,
            unit: "%",
         },
      ],
   },
   {
      SectionName: "Effects",
      icon: <BrushIcon size="25" color="#ee9d2b" />,
      controls: [
         {
            id: "hue-rotate",
            label: "Hue Rotate",
            min: 0,
            max: 360,
            defaultValue: 0,
            unit: "deg",
         },
         {
            id: "blur",
            label: "Blur",
            min: 0,
            max: 20,
            defaultValue: 0,
            unit: "px",
         },
         {
            id: "grayscale",
            label: "Grayscale",
            min: 0,
            max: 100,
            defaultValue: 0,
            unit: "%",
         },
         {
            id: "sepia",
            label: "Sepia",
            min: 0,
            max: 100,
            defaultValue: 0,
            unit: "%",
         },
         {
            id: "opacity",
            label: "Opacity",
            min: 0,
            max: 100,
            defaultValue: 100,
            unit: "%",
         },
         {
            id: "invert",
            label: "Invert",
            min: 0,
            max: 100,
            defaultValue: 0,
            unit: "%",
         },
      ],
   },
];

const PresetData = [
   {
      name: "Original",
      class: "filter-original",
      style: {
         filters: `blur(0px) 
         brightness(100%) 
         contrast(100%) 
         grayscale(0%) 
         hue-rotate(0deg) 
         invert(0%) 
         opacity(100%) 
         saturate(100%) 
         sepia(0%)`,
      },
   },
   {
      name: "Vintage",
      class: "filter-vintage",
      style: {
         backgroundColor: "#f4e4bc",
         filters: `blur(0px) 
         brightness(100%) 
         contrast(100%) 
         grayscale(0%) 
         hue-rotate(0deg) 
         invert(0%) 
         opacity(100%) 
         saturate(100%) 
         sepia(50%) `,
      },
   },
   {
      name: "Cold",
      class: "filter-cold",
      style: {
         backgroundColor: "#e0f2fe",
         filters: `blur(0px)brightness(100%)contrast(100%)grayscale(0%)hue-rotate(180deg)invert(0%)opacity(100%)saturate(100%)sepia(0%)`,
      },
   },
   {
      name: "Warm",
      class: "filter-warm",
      style: {
         backgroundColor: "#ffedd5",
         filters: `blur(0px)brightness(100%)contrast(100%)grayscale(0%)hue-rotate(0deg)invert(0%)opacity(100%)saturate(150%)sepia(0%)`,
      },
   },
   {
      name: "Dramatic",
      class: "filter-dramatic",
      style: {
         backgroundColor: "#18181b",
         filters: `blur(0px)brightness(100%)contrast(120%)grayscale(0%)hue-rotate(0deg)invert(0%)opacity(100%)saturate(100%)sepia(0%)`,
      },
   },
   {
      name: "Darken",
      class: "filter-darken",
      style: {
         backgroundColor: "#0f172a",
         filters: `blur(0px)brightness(100%)contrast(100%)grayscale(0%)hue-rotate(0deg)invert(0%)opacity(60%)saturate(100%)sepia(0%)`,
      },
   },
   {
      name: "Noir",
      class: "filter-noir",
      style: {
         backgroundColor: "#262626",
         filters: `blur(0px) brightness(110%) contrast(140%) grayscale(100%) hue-rotate(0deg) invert(0%) opacity(100%) saturate(0%) sepia(0%)`,
      },
   },
   {
      name: "Cyberpunk",
      class: "filter-cyberpunk",
      style: {
         backgroundColor: "#2e1065",
         filters: `blur(0px) brightness(120%) contrast(110%) grayscale(0%) hue-rotate(290deg) invert(0%) opacity(100%) saturate(200%) sepia(0%)`,
      },
   },
   {
      name: "Lomo",
      class: "filter-lomo",
      style: {
         backgroundColor: "#422006",
         filters: `blur(0px) brightness(110%) contrast(130%) grayscale(0%) hue-rotate(0deg) invert(0%) opacity(100%) saturate(140%) sepia(10%)`,
      },
   },
   {
      name: "Sepia Dream",
      class: "filter-sepia-dream",
      style: {
         backgroundColor: "#78350f",
         filters: `blur(0px) brightness(95%) contrast(100%) grayscale(0%) hue-rotate(0deg) invert(0%) opacity(100%) saturate(90%) sepia(80%)`,
      },
   },
   {
      name: "High Key",
      class: "filter-high-key",
      style: {
         backgroundColor: "#ffffff",
         filters: `blur(0px) brightness(150%) contrast(80%) grayscale(0%) hue-rotate(0deg) invert(0%) opacity(100%) saturate(110%) sepia(0%)`,
      },
   },
   {
      name: "Oceanic",
      class: "filter-oceanic",
      style: {
         backgroundColor: "#0c4a6e",
         filters: `blur(0px) brightness(100%) contrast(110%) grayscale(0%) hue-rotate(170deg) invert(0%) opacity(100%) saturate(120%) sepia(0%)`,
      },
   },
];

export default { filterData, PresetData };
