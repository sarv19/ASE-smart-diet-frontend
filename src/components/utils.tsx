export const capitalizeFirstLetter = (str: string) => {
    return str.charAt(0).toUpperCase() + str.slice(1);
}

export const getKeyByValue = (object: any, value: any) => {
    return Object.keys(object).find(key => object[key] === value);
}

export const titleCase = (str: string) => {
   var splitStr = str.toLowerCase().split(' ');
   for (var i = 0; i < splitStr.length; i++) {
       splitStr[i] = splitStr[i].charAt(0).toUpperCase() + splitStr[i].substring(1);     
   }
   return splitStr.join(' '); 
}

export const transformIngredientList = (list: any) => {
    if (!list || list.length < 1) return [];
    return list.map((item: any) => (
      { label: titleCase(item.ingredientName), value: item.ingredientName, preferenceId: item.preferenceId, id: item.ingredientId}
    ))
}