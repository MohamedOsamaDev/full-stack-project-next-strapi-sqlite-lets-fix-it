import axios from "axios";
import { notFound } from "next/navigation";

export const getCompanyData = async ({slug,jwt}) => {
  try {
    let response = await fetch(
      `${process.env.NEXT_PUBLIC_API}/companies/${slug}`,
      {
        cache: "no-store",
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    /*handle error with notfound page */

    if (!response.ok) throw new Error("Not Found");

    response = await response?.json();
    return response;
  } catch (error) {
    return notFound();
  }
};

export const createOrder = async ({ form, jwt }) => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API}/requsets`,
      form,
      {
        headers: {
          Authorization: `Bearer ${jwt}`,
        },
      }
    );
    console.log("🚀 ~ createOrder ~ data:", data);
    return data;
  } catch (error) {
    console.log("🚀 ~ createOrder ~ error:", error);
    throw `${error.message}`;
  }
};
