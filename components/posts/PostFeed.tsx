import { useState } from "react";
import Button from "../Button";
import PostsGroup from "./PostsGroup";
import usePostsCount from "@/hooks/usePostsCount";
import { POSTS_PER_PAGE } from "@/config";
interface PostFeedProps {
  userId?: string;
}

const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
  const { data: count } = usePostsCount(userId);
  const [page, setPage] = useState(1);
  const maxPage = Math.ceil(count / POSTS_PER_PAGE);

  return (
    <>
      {[...Array(page)].map((e, i) => (
        <PostsGroup key={i} userId={userId} page={i + 1} />
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
