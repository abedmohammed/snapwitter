import usePosts from "@/hooks/usePosts";
import React from "react";
import PostItem from "./PostItem";

interface PostsGroupProps {
  page: number;
  userId?: string;
}

const PostsGroup: React.FC<PostsGroupProps> = ({ page, userId }) => {
  const { data: posts = [] } = usePosts(page, userId);
  return (
    <>
      {posts.map((post: Record<string, any>) => (
        <PostItem userId={userId} key={post.id} data={post} page={page} />
      ))}
    </>
  );
};

export default PostsGroup;
