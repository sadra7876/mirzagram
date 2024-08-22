import {
  ToastComponent,
  toast,
} from "../../../Shared/Components/ToastComponent";

const BASE_URL = import.meta.env.VITE_REACT_APP_BASE_URL;

export const postUploadFile = async (data: FormData) => {
  const token = localStorage.getItem("token");
  try {
    const response = await fetch(`${BASE_URL}upload`, {
      method: "POST",
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: data,
    });

    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    toast.error("There was a problem with the registration");
  }
};
