import axios from "axios";

export const signUp = async (form) => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API}/auth/local/register`,
      form
    );
    return data;
  } catch (error) {
    throw `${" حدث خطا تقني قرب في وقت لاحق"}`;
  }
};
