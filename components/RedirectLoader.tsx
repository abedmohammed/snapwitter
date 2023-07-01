import { ClipLoader } from "react-spinners";
import { useRouter } from "next/router";
import { useState } from "react";

const RedirectLoader = () => {
  const router = useRouter();
  const [isLoading, setLoading] = useState(false);

  if (!router.events) return null;

  const handleRouteChange = () => {
    setLoading(true);
  };
  const handleRouteChangeComplete = () => {
    setLoading(false);
  };

  router.events.on("routeChangeStart", handleRouteChange);
  router.events.on("routeChangeComplete", handleRouteChangeComplete);

  if (!isLoading) return null;

  return (
    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none bg-neutral-800 bg-opacity-40">
      <ClipLoader color="yellow" size={80} />
    </div>
  );
};

export default RedirectLoader;
