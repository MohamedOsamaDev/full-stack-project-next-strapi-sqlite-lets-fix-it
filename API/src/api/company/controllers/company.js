const {
  handlePage,
  convertCommaSeparatedValues,
} = require("../../../utils/handleQuery");

// @ts-nocheck
module.exports = {
  getCompanies: async (ctx) => {
    try {
      const query = convertCommaSeparatedValues({ ...ctx?.request?.query }, [
        "page",
      ]);
      const page = handlePage(ctx?.request?.query?.page);
      let f = {};
      if (query?.service) {
        f = {
          filters: {
            services: {
              slug: {
                $eq: query?.service,
              },
              // publishedAt: {
              //   $eq: ,
              // },
            },
          },
        };
      }
      const companies = await strapi.entityService.findPage(
        "api::company.company",
        {
          page,
          pageSize: 15,
          populate: {
            poster: {
              fields: ["url"],
            },
          },
   
          ...f,
        }
      );
      return ctx.send(companies);
    } catch (error) {
      console.log("🚀 ~ homePage: ~ error:", error);
      return ctx.badRequest(error);
    }
  },
  findOne: async (ctx) => {
    try {
      const company = await strapi.db.query("api::company.company").findOne({
        where: { slug: ctx?.request?.params?.slug },
        populate: {
          poster: {
            select: ["url"],
          },
        },
      });
      if (!company) return ctx.badRequest("No company found");
      const { governorate, Region } = ctx.state.user;
      let info = {
        governorate,
        Region,
      };
      return ctx.send({ company, info });
    } catch (error) {
      console.log("🚀 ~ homePage: ~ error:", error);
      return ctx.badRequest(error);
    }
  },
};
