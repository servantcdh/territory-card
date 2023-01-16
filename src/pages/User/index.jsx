import React, { useCallback, useState } from "react";
import { useQueries, useQueryClient } from "@tanstack/react-query";
import { usersApi } from "../../hooks/api/user";
import UserLayout from "../../components/templates/UserLayout";

const UserPage = () => {
  const [searchName, setSearchName] = useState("");
  const queryClient = useQueryClient();
  const results = useQueries({
    queries: [
      {
        queryKey: ["users", { name: searchName, orderBy: "name" }],
        queryFn: usersApi,
        refetchInterval: 1000,
      },
    ],
  });
  const { data: usersData } = results[0];
  const users = usersData ? usersData : [];
  const onSearchUserHandler = useCallback(
    (name) => {
      setSearchName(name);
      queryClient.invalidateQueries(["users"]);
    },
    [queryClient]
  );
  return (
    <UserLayout usersData={users} onSearchUser={onSearchUserHandler} />
  );
};

export default UserPage;
