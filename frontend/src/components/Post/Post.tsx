import React from 'react';
import './Post.css;';

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
  // id,
  isMyProfile,
}) => {
  const formattedDate = new Date(Number(date));
  return (
    <div
      className="Post"
      style={published === false ? { backgroundColor: "hotpink" } : {}}
    >
      {isMyProfile && published === false && (
        <p className="Post__publish" onClick={() => {}}>
          publish
        </p>
      )}
      {isMyProfile && published === true && (
        <p className="Post__publish" onClick={() => {}}>
          unpublished
        </p>
      )}
      <div className="Post__header-container">
        <h2>{title}</h2>
        <h4>
          Created At {`${formattedDate}`.split(" ").splice(0, 3).join(" ")} by{" "}
          {user}
        </h4>
      </div>
      <p>{content}</p>
    </div>
  );
}
