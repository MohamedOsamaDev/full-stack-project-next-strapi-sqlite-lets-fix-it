import axios from "axios";

export const logIn = async (form) => {
  try {
    const { data } = await axios.post(
      `${process.env.NEXT_PUBLIC_API}/auth/local`,
      form
    );
    return data;
  } catch (error) {
    throw `${"خطا في الايمال او كلمة المرور"}`;
  }
};
