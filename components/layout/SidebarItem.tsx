import useCurrentUser from "@/hooks/useCurrentUser";
import useLoginModal from "@/hooks/useLoginModal";
import { useRouter } from "next/router";
import { useCallback } from "react";
import { IconType } from "react-icons";
import { BsDot } from "react-icons/bs";

interface SidebarItemProps {
  label: string;
  href?: string;
  icon: IconType;
  onClick?: () => void;
  auth?: boolean;
  alert?: boolean;
}

const SidebarItem: React.FC<SidebarItemProps> = ({
  label,
  href,
  icon: Icon,
  onClick,
  auth,
  alert,
}) => {
  const loginModal = useLoginModal();
  const { data: currentUser } = useCurrentUser();
  const router = useRouter();
  const handleClick = useCallback(() => {
    if (onClick) {
      return onClick();
    }

    if (auth && !currentUser) {
      loginModal.onOpen();
    } else if (href) {
      router.push(href);
    }
  }, [router, onClick, href, currentUser, auth, loginModal]);

  return (
    <div
      onClick={handleClick}
      className="rounded-full hover:bg-slate-300 hover:bg-opacity-10 cursor-pointer relative flex flex-row items-center"
    >
      <div className="relative h-14 w-14 flex items-center justify-center p-4 lg:hidden">
        <Icon size={28} color="white" />
        {alert ? (
          <BsDot
            className="text-[#ffee00] absolute -top-4 left-0 pointer-events-none"
            size={70}
          />
        ) : null}
      </div>
      <div className="relative hidden lg:flex items-center gap-4 p-4 rounded-full">
        <Icon size={24} color="white" />
      </div>
      <p className="hidden lg:block text-white text-xl">{label}</p>
      {alert ? (
        <BsDot
          className="text-[#ffee00] absolute -top-4 left-0 pointer-events-none"
          size={70}
        />
      ) : null}
    </div>
  );
};

export default SidebarItem;
