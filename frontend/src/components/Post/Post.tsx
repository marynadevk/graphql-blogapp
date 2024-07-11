import React from 'react';
import './Post.css';
import { gql, useMutation } from '@apollo/client';

const PUBLISH_POST = gql`
  mutation PublishPost($postId: ID!) {
    postPublish(postId: $postId) { post { title } }
  }
`;

const UNPUBLISH_POST = gql`
  mutation unpublishedPost($postId: ID!) {
    postUnpublished(postId: $postId) { post { title } }
  }
`;

type Props = {
  title: string;
  content: string;
  date: string;
  user: string;
  published: boolean;
  id: string;
  isMyProfile: boolean;
};

export const Post: React.FC<Props> = ({
  title,
  content,
  date,
  user,
  published,
  id,
  isMyProfile,
}) => {
  const [publishPost] = useMutation(PUBLISH_POST);
  const [unpublishedPost] = useMutation(UNPUBLISH_POST);

  const formattedDate = new Date(Number(date));
  return (
    <div
      className="Post"
      style={published === false ? { backgroundColor: "hotpink" } : {}}
    >
      {isMyProfile && published === false && (
        <p
          className="Post__publish"
          onClick={() => publishPost({ variables: { postId: id } })}
        >
          publish
        </p>
      )}
      {isMyProfile && published === true && (
        <p
          className="Post__publish"
          onClick={() => unpublishedPost({ variables: { postId: id } })}
        >
          unpublished
        </p>
      )}
      <div className="Post__header-container">
        <h2>{title}</h2>
        <h4>
          Created At {`${formattedDate}`.split(" ").splice(0, 3).join(" ")} by{" "} {user}
        </h4>
      </div>
      <p>{content}</p>
    </div>
  );
}
