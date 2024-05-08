import axios from "axios";

export const getCompanies = async ({ queryKey, pageParam = 1 }) => {
  const [f, query] = queryKey; //to destracting secend value
  const formatQuery = new URLSearchParams({
    service: query,
    page: pageParam,
  }).toString(); // to handel query format object to page=1
  try {
    const { data } = await axios.get(
      `${process.env.NEXT_PUBLIC_API}/companies?${formatQuery}`
    );
    return data;
  } catch (error) {
    console.log("🚀 ~ getCompanies ~ error:", error);
  }
};
