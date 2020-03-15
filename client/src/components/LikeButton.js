import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/react-hooks';
import { Button, Icon, Label } from 'semantic-ui-react';

import { LIKE_POST_MUTATION } from "../util/graphql";
import CustomPopup from '../util/CustomPopup';

const LikeButton = props => {
  const { user, postId, likes, likeCount } = props;
  const [liked, setLiked] = useState(false);

  const [likePost] = useMutation(LIKE_POST_MUTATION, {
    variables: { postId }
  });

  useEffect(() => {
    if (user && likes.find(like => like.userId === user.id)) {
      setLiked(true);
    } else {
      setLiked(false);
    }
  }, [user, likes]);

  const likeButton = user ? (
    liked ? (
      <Button color='teal' onClick={likePost}>
        <Icon name='heart' />
        Like
      </Button>
    ) : (
      <Button color='teal' basic onClick={likePost}>
        <Icon name='heart' />
        Like
      </Button>
    )
  ) : (
    <Button color='teal' basic as={Link} to='/login'>
      <Icon name='heart' />
      Like
    </Button>
  );

  return (
    <CustomPopup content={liked ? 'Unlike' : 'Like'}>
      <Button as='div' labelPosition='right'>
        {likeButton}

        <Label basic color='teal' pointing='left'>
          {likeCount}
        </Label>
      </Button>
    </CustomPopup>
  );
};

export default LikeButton;
