import axios from "axios";

export const getProfile = async (jwt) => {
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/users/me`,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    return data;
  } catch (error) {
    console.log("🚀 ~ getProfile ~ error:", error);
    throw "Error getting profile";
  }
};
