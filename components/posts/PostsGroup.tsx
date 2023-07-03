import usePosts from "@/hooks/usePosts";
import React from "react";
import PostItem from "./PostItem";

interface PostsGroupProps {
  page: number;
  userId?: string;
  forUserId?: string;
  showAll?: boolean;
}

const PostsGroup: React.FC<PostsGroupProps> = ({
  page,
  userId,
  forUserId,
  showAll,
}) => {
  const { data: posts = [] } = usePosts(page, userId, forUserId, showAll);
  return (
    <>
      {posts.map((post: Record<string, any>) => (
        <PostItem userId={userId} key={post.id} data={post} page={page} />
      ))}
    </>
  );
};

export default PostsGroup;
