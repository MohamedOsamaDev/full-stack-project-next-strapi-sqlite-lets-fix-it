export const handleErrorAPI = (error, message) => {
  if (error?.meesage === "Network Error" || error?.code === "ERR_NETWORK") {
    return {
      status: 500,
      statusText: "Internal Server Error",
      message: "An error occurred try again later",
      errorBunndery: true,
    };
  }
  return {
    status: 200,
    statusText: "success",
    message,
    errorBunndery: false,
  };
};
