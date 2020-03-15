import React, { useContext } from 'react';
import { Button, Card, Icon, Image, Label } from "semantic-ui-react";
import moment from "moment";
import { Link } from "react-router-dom";

import { AuthContext } from "../context/auth";
import LikeButton from "./LikeButton";
import DeleteButton from './DeleteButton';
import CustomPopup from '../util/CustomPopup';

const PostCard = props => {
  const { user } = useContext(AuthContext);
  const { post: { id, body, createdAt, userName, likeCount, likes, commentCount } } = props;

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

        <CustomPopup content='Comment on post'>
          <Button as='div' labelPosition='right'>
            <Button color='blue' basic as={Link} to={`/posts/${id}`}>
              <Icon name='comments' />
              Comment
            </Button>

            <Label basic color='blue' pointing='left'>
              {commentCount}
            </Label>
          </Button>
        </CustomPopup>

        {user && user.userName === userName && (
          <DeleteButton postId={id} />
        )}
      </Card.Content>
    </Card>
  );
};

export default PostCard;
