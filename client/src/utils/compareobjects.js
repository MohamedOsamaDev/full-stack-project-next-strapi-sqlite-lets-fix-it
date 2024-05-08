export const compareObjects = (obj1 = {}, obj = {}) => {
    try {
        // Get the keys of both objects
        const keys1 = Object.keys(obj1);
        const keys2 = Object.keys(obj2);
    
        // Check if the number of keys is the same
        if (keys1.length !== keys2.length) {
          return false;
        }
    
        // Iterate through keys and compare values
        for (let key of keys1) {
          // Check if the current key exists in both objects
          if (!obj2.hasOwnProperty(key)) {
            return false;
          }
    
          // Compare the values
          if (obj1[key] !== obj2[key]) {
            return false;
          }
        }
    
        // If all keys and values are the same, return true
        return true;
      } catch (error) {
        // Log any errors and return false
        console.error("Error occurred while comparing objects:", error);
        return false;
      }
};
