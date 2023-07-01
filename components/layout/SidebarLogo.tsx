import { useRouter } from "next/router";
import SnapwitterLogo from "../../public/images/Snapwitter_logo.svg";
import Image from "next/image";

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
        hover:bg-yellow-400
        hover:bg-opacity-10
        cursor-pointer
        transition
      "
    >
      <Image
        src={SnapwitterLogo}
        height={28}
        width={28}
        alt="Snapwitter logo"
      />
    </div>
  );
};

export default SidebarLogo;
