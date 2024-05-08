// @ts-nocheck
module.exports = {
  getServices: async (ctx) => {
    try {
      const services = await strapi.entityService.findMany(
        "api::service.service",
        {
          limit: 50,
          start: 0,
        }
      );

      return ctx.send(services || []);
    } catch (error) {
      return ctx.badRequest(error);
    }
  },
};
