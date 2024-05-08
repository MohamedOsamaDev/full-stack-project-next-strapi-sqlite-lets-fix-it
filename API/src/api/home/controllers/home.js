// @ts-nocheck
module.exports = {
  homePage: async (ctx) => {
    try {
      const result =
        (await strapi.entityService.findMany("api::home.home", {
          // @ts-ignore
          populate: "deep",
        })) || {};
      const services = await strapi.entityService.findMany(
        "api::service.service",
        {
          // @ts-ignore
          populate: "deep",
          limit: 25,
          start: 0,
        }
      );
      const data = {
        landing: result?.landing || {},
        services,
      };
      return ctx.send(data);
    } catch (error) {
      console.log("🚀 ~ homePage: ~ error:", error);
      return ctx.badRequest(error);
    }
  },
};
