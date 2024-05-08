module.exports = {
  routes: [
    {
      method: "POST",
      path: "/requsets",
      handler: "order.CreateOne",
    },
    {
      method: "GET",
      path: "/orders",
      handler: "order.getSpecificOdrers",
    },
    {
      method: "GET",
      path: "/orders/:id",
      handler: "order.getSpecificOdrer",
    },
  ],
};
