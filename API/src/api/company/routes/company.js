module.exports = {
  routes: [
    {
      method: "GET",
      path: "/companies",
      handler: "company.getCompanies",
    },
    {
      method: "GET",
      path: "/companies/:slug",
      handler: "company.findOne",
    },
  ],
};
