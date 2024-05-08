import axios from "axios";
import { notFound } from "next/navigation";

export const getServies = async ({}) => {
  const { data } = await axios.get(`${process.env.NEXT_PUBLIC_API}/services`);
  return data;
};
//  this function for react query uses !
