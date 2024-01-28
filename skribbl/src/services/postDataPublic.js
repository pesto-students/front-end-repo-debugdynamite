import axios from "axios";

const postDataPublic = async (url, postData) => {
  try {
    const response = await axios.post(url, postData);
    console.log("response from post request: ", response);
    return response.data;
  } catch (error) {
    console.error("Error in postDataPublic:", error.message);
    throw error;
  }
};

export default postDataPublic;
