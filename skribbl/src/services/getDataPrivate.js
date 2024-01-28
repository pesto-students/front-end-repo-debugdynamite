import axios from "axios";

const getDataPrivate = async (url, user) => {
  console.log("url in private: ", url);
  if (!user) {
    throw new Error("User not found!");
  }

  const token = await user.getIdToken();
  console.log({ token });
  const response = await axios.get(url, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return response.data;
};

export default getDataPrivate;
