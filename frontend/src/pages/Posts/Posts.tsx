import { gql, useQuery } from "@apollo/client";
import { Post } from "../../components/Post/Post.js";

const GET_POST = gql`
  query {
    posts {
      title
      content
      createdAt
      user {
        name
      }
    }
  }
`;

export const Posts = () => {
  const { loading, error, data } = useQuery(GET_POST);

  if (error) return <div>Error Page</div>;

  if (loading) return <div>Loading... Please wait</div>;

  const { posts } = data;

  return (
    <div>
      {posts.map((post: any) => (
        <Post
          key={post.id}
          title={post.title}
          content={post.content}
          date={post.createdAt}
          id={post.id}
          user={post.user.name}
          published={post.published}
          isMyProfile={post.isMyProfile}
        />
      ))}
    </div>
  );
};
