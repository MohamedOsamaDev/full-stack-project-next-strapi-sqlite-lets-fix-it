export const CovertStringToArray = (text = "") => {
  try {
    // handle type string
    let array = text?.toString();
    // remove spaces
    array.trim();
    // covert string to array
    array = string.split(",");
    array = array.filter((val) => val);
    // retrun the array
    return array;
  } catch (error) {
    // Handle the error and return emty array
    console.error(error.message);
    return [];
  }
};
