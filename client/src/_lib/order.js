import axios from "axios";

export const getOneOrder = async (jwt, id) => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/orders/${id}`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    return data;
  } catch (error) {
    throw `${" حدث خطا تقني جرب في وقت لاحق"}`;
  }
};
