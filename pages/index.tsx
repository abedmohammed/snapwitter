import Form from "@/components/Form";
import Header from "@/components/Header";
import PostFeed from "@/components/posts/PostFeed";
import useCurrentUser from "@/hooks/useCurrentUser";

export default function Home() {
  const { data: currentUser } = useCurrentUser();

  return (
    <>
      <Header label="Home" />
      <Form placeholder="What's happening?" />
      {currentUser ? (
        <PostFeed forUserId={currentUser.id as string} />
      ) : (
        <PostFeed />
      )}
    </>
  );
}
