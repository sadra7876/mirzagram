import { toast } from "../../../Shared/Components/ToastComponent";
import { MirzaPost } from "../../../Shared/model/post.interface";

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

export const postCreatePost = async (data: MirzaPost) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${BASE_URL}post`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify(data),
    });

    const result = await response.json();
    console.log(result);
    return result;
    // if (result.isSuccess) {
    //   setTimeout(() => {
    //     localStorage.setItem("token", result.result.accessToken);
    //     navigate("/");
    //   }, 2000);
    // } else {
    //   result.messages.map((message: string) => {
    //     toast.error(message);
    //   });
    // }
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    toast.error("There was a problem with the registration");
  }
};
