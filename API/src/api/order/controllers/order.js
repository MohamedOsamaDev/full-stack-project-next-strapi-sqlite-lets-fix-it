module.exports = {
  CreateOne: async (ctx) => {
    try {
      const company = await strapi.db.query("api::company.company").findOne({
        where: { slug: ctx.request.body.company },
      });
      if (!company) return ctx.badRequest("No company found");
      ctx.request.body.customer = ctx?.state?.user?.id;
      ctx.request.body.company = company.id;
      if (ctx?.request?.files?.media) {
        const { media } = ctx?.request?.files;
        const uploadedFile = await strapi
          .service("plugin::upload.upload")
          .upload({
            data: {
              fileInfo: { caption: "hello", alternativeText: "", name: "" },
            },
            files: media,
          });
        ctx.request.body.media = uploadedFile[0];
      }
      const result = await strapi.entityService.create("api::order.order", {
        data: ctx.request.body,
        populate: {
          media: {
            fields: ["url"],
          },
          company: {
            populate: { poster: { fields: ["url"] } },
          },
          service: {
            populate: {
              logo: {
                fields: ["url"],
              },
            },
          },
          customer: {
            fields: ["email", "username", "id"],
          },
        },
      });
      return ctx.send(result);
    } catch (error) {
      console.log("🚀 ~ CreateOne: ~ error:", error);
      return ctx.badRequest(error);
    }
  },
  getSpecificOdrers: async (ctx) => {
    try {
      const result = await strapi.entityService.findMany("api::order.order", {
        filters: {
          customer: ctx?.state?.user?.id,
        },
        populate: {
          media: {
            fields: ["url"],
          },
          company: {
            populate: { poster: { fields: ["url"] } },
          },
          service: {
            populate: {
              logo: {
                fields: ["url"],
              },
            },
          },
          customer: {
            fields: ["email", "username", "id"],
          },
        },
      });
      return ctx.send(result);
    } catch (error) {
      return ctx.badRequest(error);
    }
  },
  getSpecificOdrer: async (ctx) => {
    try {
      const result = await strapi.db.query("api::order.order").findOne({
        where: { uid: ctx.params.id, customer: ctx?.state?.user?.id },
        populate: {
          media: {
            select: ["url"],
          },
          company: {
            populate: { image: { select: ["url"] } },
          },
          service: {
            populate: {
              image: {
                select: ["url"],
              },
            },
          },
          customer: {
            select: ["email", "username", "id"],
          },
        },
      });
      if (!result) return ctx.badRequest("not found");
      return ctx.send(result);
    } catch (error) {
      return ctx.badRequest(error);
    }
  },
};
