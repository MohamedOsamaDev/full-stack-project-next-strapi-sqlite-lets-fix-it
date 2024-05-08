import axios from "axios";

export const getMyOrders = async (jwt) => {
  try {
    const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/orders`, {
      headers: {
        Authorization: `Bearer ${jwt}`,
      },
    });
    return { data, error: false };
  } catch (error) {
    console.log("🚀 ~ getMyOrders ~ error:", error);
    return {
      error: {
        message: "حدث خطا تقني جرب في وقت لاحق",
      },
    };
  }
};
