import usePosts from "@/hooks/usePosts";
import PostItem from "./PostItem";
import Button from "../Button";

interface PostFeedProps {
  userId?: string;
}

const PostFeed: React.FC<PostFeedProps> = ({ userId }) => {
  const { data: posts = [] } = usePosts(userId);

  return (
    <>
      {posts.map((post: Record<string, any>) => (
        <PostItem userId={userId} key={post.id} data={post} />
      ))}
      <div className="w-full flex flex-col items-center pt-8 pb-4">
        <Button label="Load more" outline onClick={() => {}} />
      </div>
    </>
  );
};

export default PostFeed;
