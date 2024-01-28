import axios from "axios";

const postDataPrivate = async (url, postData, user) => {
  if (!user) {
    throw new Error("User not found!");
  }

  const token = await user.getIdToken();

  const response = await axios.post(url, postData, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export default postDataPrivate;
