export const toDec = (hex: string) => {
  let result = '';
  for (let i = 0; i < hex.length; i++) {
    result += hex.charCodeAt(i).toString(10);
  }
  return result;
};

export const indexOfAny = (str: string, arr: string[]) => {
  let result = false;
  for (let i = 0; i < arr.length; i++) {
    if (str.includes(arr[i])) {
      return true;
    }
  }
  return result;
};
