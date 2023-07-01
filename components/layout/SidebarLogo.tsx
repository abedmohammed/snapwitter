import { useRouter } from "next/router";
import { BsSnapchat } from "react-icons/bs";

const SidebarLogo = () => {
  const router = useRouter();

  return (
    <div
      onClick={() => {
        router.push("/");
      }}
      className="
        rounded-full
        h-14
        w-14
        p-4
        flex
        items-center
        justify-center
        hover:bg-yellow-300
        hover:bg-opacity-10
        cursor-pointer
        transition
      "
    >
      <BsSnapchat size={28} color="white" />
    </div>
  );
};

export default SidebarLogo;
