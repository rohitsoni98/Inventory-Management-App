import axios from "axios";
import toast from "react-toast";

const apiClient = axios.create({
  baseURL: "https://dev-0tf0hinghgjl39z.api.raw-labs.com",
  headers: {
    "Content-Type": "application/json",
  },
});

export const getStatsData = async () => {
  try {
    const response = await apiClient.get("/inventory");
    return response.data;
  } catch (error) {
    toast.dismiss();
    toast.error(error?.["response"]?.["statusText"] || "something went wrong");
  }
};
