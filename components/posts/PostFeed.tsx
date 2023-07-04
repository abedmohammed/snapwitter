import { useState } from "react";
import Button from "../Button";
import PostsGroup from "./PostsGroup";
import usePostsCount from "@/hooks/usePostsCount";
import { POSTS_PER_PAGE } from "@/config";
interface PostFeedProps {
  userId?: string;
  forUserId?: string;
}

const PostFeed: React.FC<PostFeedProps> = ({ userId, forUserId }) => {
  const [showAll, setShowAll] = useState(true);
  const { data: count } = usePostsCount(userId, showAll ? "" : forUserId);
  const [page, setPage] = useState(1);
  const maxPage = Math.ceil(count / POSTS_PER_PAGE);

  const toggleFeed = () => {
    setPage(1);
  };

  return (
    <>
      {forUserId && (
        <div className="h-16 gap-8 flex items-center justify-center border-b-[1px] border-neutral-800 text-white text-xl">
          <p
            onClick={() => {
              setShowAll(true);
              toggleFeed();
            }}
            className={`cursor-pointer transition ${
              showAll ? "text-white" : "text-neutral-500"
            }`}
          >
            All
          </p>
          <p
            onClick={() => {
              setShowAll(false);
              toggleFeed();
            }}
            className={`cursor-pointer ${
              !showAll ? "text-white" : "text-neutral-500"
            }`}
          >
            For you
          </p>
        </div>
      )}
      {count === 0 && !showAll && (
        <div className="h-60 md:h-40 flex justify-center items-center text-lg text-neutral-500 ml-10 mr-10 md:ml-20 md:mr-20 text-center">
          <p>
            Looks like your For You page is feeling a bit lonely. Start
            exploring and following creators to fill it up with exciting
            content!
          </p>
        </div>
      )}
      {[...Array(page)].map((e, i) => (
        <PostsGroup
          showAll={showAll}
          forUserId={forUserId}
          key={i}
          userId={userId}
          page={i + 1}
        />
      ))}
      <div className="w-full flex flex-col items-center pt-8 pb-4">
        {page < maxPage && (
          <Button
            label="Load more"
            outline
            onClick={() => {
              setPage((prevPage) => prevPage + 1);
            }}
          />
        )}
      </div>
    </>
  );
};

export default PostFeed;
