export const convertTime = (timeString) => {
  try {
    const date = new Date(timeString);
    const day = date.getDate();
    const month = date
      .toLocaleString("en-US", { month: "short" })
      .toUpperCase(); // Convert month to uppercase for "Fep"
    const year = date.getFullYear();

    const formattedTime = `${day},${month} ${year}`;

    return formattedTime;
  } catch (error) {
    return "";
  }
};
