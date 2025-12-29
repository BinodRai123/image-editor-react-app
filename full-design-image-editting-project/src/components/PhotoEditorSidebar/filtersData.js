const filterData = [
   {
      SectionName: "Adjust",
      icon: "",
      controls: [
         { id: "brightness", label: "Brightness", min: -100, max: 100, defaultValue: 0, unit: "" },
         { id: "contrast", label: "Contrast", min: -100, max: 100, defaultValue: 15, unit: "", prefix: "+" },
         { id: "saturation", label: "Saturation", min: -100, max: 100, defaultValue: 0, unit: "" },
      ],
   },
   {
      SectionName: "Effects",
      icon: "",
      controls: [
         { id: "hue", label: "Hue Rotate", min: 0, max: 360, defaultValue: 0, unit: "°" },
         { id: "blur", label: "Blur", min: 0, max: 20, defaultValue: 0, unit: "px" },
         { id: "grayscale", label: "Grayscale", min: 0, max: 100, defaultValue: 0, unit: "%" },
         { id: "sepia", label: "Sepia", min: 0, max: 100, defaultValue: 0, unit: "%" },
         { id: "opacity", label: "Opacity", min: 0, max: 100, defaultValue: 100, unit: "%" },
         { id: "invert", label: "Invert", min: 0, max: 100, defaultValue: 0, unit: "%" },
      ],
   },
];

const PresetData = [
   { name: "Original", class: "filter-original", style: {} },
   {
      name: "Vintage",
      class: "filter-vintage",
      style: { backgroundColor: "#f4e4bc", filter: "sepia(0.5)" },
   },
   {
      name: "Cold",
      class: "filter-cold",
      style: { backgroundColor: "#e0f2fe", filter: "hue-rotate(180deg)" },
   },
   { name: "Warm", class: "filter-warm", style: { backgroundColor: "#ffedd5", filter: "saturate(1.5)" } },
   {
      name: "Dramatic",
      class: "filter-dramatic",
      style: { backgroundColor: "#18181b", filter: "contrast(1.2)" },
   },
   { name: "Darken", class: "filter-darken", style: { backgroundColor: "#0f172a", opacity: 0.6 } },
];

export default { filterData, PresetData };
