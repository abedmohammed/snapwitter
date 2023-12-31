import Avatar from "@/components/Avatar";
import useUsers from "@/hooks/useUsers";
import Header from "@/components/Header";
import Input from "@/components/Input";
import axios from "axios";
import { useCallback, useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const Users = () => {
  const [search, setSearch] = useState("");
  const [users, setUsers] = useState<any[]>([]);

  const { data: usersInitial = [] } = useUsers();

  useEffect(() => {
    setUsers(usersInitial);
  }, [usersInitial]);

  const onSearch = useCallback(async (search: string) => {
    try {
      if (!search) {
        setUsers(usersInitial);
      } else {
        const { data: users } = await axios.get(`/api/users?search=${search}`);
        setUsers(users);
      }
    } catch (error) {
      toast.error("Something went wrong");
    }
  }, []);

  return (
    <>
      <Header showBackArrow label="Search users" />
      <Input
        placeholder="Search username..."
        value={search}
        type="text"
        onChange={(e) => {
          setSearch(e.target.value);
          onSearch(e.target.value);
        }}
      />
      {users?.map((user) => (
        <div className="h-20 flex items-center pl-4 gap-5" key={user.id}>
          <Avatar userId={user.id} />
          <div className="flex flex-col">
            <p className="text-white text-xl font-semibold">{user.name}</p>
            <p className="text-md text-neutral-500">@{user.username}</p>
          </div>
        </div>
      ))}
    </>
  );
};

export default Users;
