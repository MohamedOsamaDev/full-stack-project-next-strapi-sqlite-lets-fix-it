export const isValidDate = (input, inError) => {
  // Try creating a new Date object using the input
  const date = new Date(input);

  // Check if the date is valid and input is not empty
  if (!isNaN(date) && input.trim() !== "") {
    return input; // Return input if it's a valid date
  } else {
    return inError || 172800000; // Return 2 days in milliseconds if input is not a valid date
  }
};
