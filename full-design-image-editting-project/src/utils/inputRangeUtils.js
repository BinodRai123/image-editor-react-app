//this function will return initial filter state object
// like this { brightness: {value:0, unit: '%'}, contrast: {value:15, unit: '%'} ...}
const getInitialFilterState = (filterData) => {
   return filterData.reduce((acc, section) => {
      section.controls.forEach(({ id, defaultValue, unit }) => {
         acc[id] = {
            value: defaultValue,
            unit,
         };
      });
      return acc;
   }, {});
};

// parse/convert the preset filter string into
// nested objected for globalfilterdata
function parseFilters(filterString) {
   const result = {};

   // Regex: matches 'filter-name(number unit)'
   // group 1: name, group 2: value, group 3: unit
   const regex = /([\w-]+)\(([\d.]+)([^)]*)\)/g;
   let match;

   while ((match = regex.exec(filterString)) !== null) {
      const [_, name, value, unit] = match;
      result[name] = {
         value: parseFloat(value),
         unit: unit.trim(),
      };
   }

   return result;
}

export { getInitialFilterState, parseFilters };
