module.exports = {
  routes: [
    {
      method: "GET",
      path: "/services",
      handler: "service.getServices",
    },
  ],
};
