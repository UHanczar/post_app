import React, { useContext } from 'react';
import { Button, Card, Icon, Image, Label } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";

const PostCard = props => {
  const { user } = useContext(AuthContext);
  const { post: { id, body, createdAt, userName, likeCount, likes, commentCount, comments } } = props;

  const likePost = () => console.log('LIKE_POST');

  const deletePost = () => console.log('DELETE_POST');

  return (
    <Card fluid>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/molly.png'
        />

        <Card.Header>{userName}</Card.Header>

        <Card.Meta as={Link} to={`/post/${id}`}>{moment(createdAt).fromNow(true)}</Card.Meta>

        <Card.Description>{body}</Card.Description>
      </Card.Content>

      <Card.Content extra>
        <LikeButton
          user={user}
          postId={id}
          likes={likes}
          likeCount={likeCount}
        />

        <Button as='div' labelPosition='right'>
          <Button color='blue' basic as={Link} to={`/posts/${id}`}>
            <Icon name='comments' />
            Comment
          </Button>

          <Label basic color='blue' pointing='left'>
            {commentCount}
          </Label>
        </Button>

        {user && user.userName === userName && (
          <Button
            as='div'
            color='red'
            floated='right'
            onClick={deletePost}
          >
            <Icon name='trash' style={{ margin: 0 }} />
          </Button>
        )}
      </Card.Content>
    </Card>
  );
};

export default PostCard;
