import { notFound } from "next/navigation";
import { cache } from "react";

export const getHomePage = cache(async () => {
  try {
    let response = await fetch(`${process.env.NEXT_PUBLIC_API}/home-page`, {
      cache: "no-cache",
    });
    /*handle error with notfound page */

    if (!response.ok) throw new Error("Not Found");

    response = await response?.json();
    return response;
  } catch (error) {
    console.log("🚀 ~ getHomePage ~ error:", error);
    return notFound();
  }
});
