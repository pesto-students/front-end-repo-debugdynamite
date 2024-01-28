import { useState } from "react";
import { UserAuth } from "./context/AuthContext";
import getDataPrivate from "./services/getDataPrivate";
import { useQuery } from "@tanstack/react-query";

const FetchTest = () => {
  const { user } = UserAuth();
  const url = "http://localhost:3001/api/user/all";
  const [isQueryEnabled, setIsQueryEnabled] = useState(false);

  const { data, error, isLoading, refetch } = useQuery({
    queryKey: ["test"],
    queryFn: () => getDataPrivate(url, user),
    enabled: isQueryEnabled,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error fetching data: {error.message}</div>;
  }

  console.log("Data: ", data);

  return (
    <div>
      <button onClick={() => refetch()}>fetch data</button>
    </div>
  );
};

export default FetchTest;
