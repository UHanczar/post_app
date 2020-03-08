import React, { useState } from 'react';
import { Button, Confirm, Icon } from 'semantic-ui-react';

import { DELETE_POST_MUTATION, FETCH_POSTS_QUERY } from '../util/graphql';
import { useMutation } from '@apollo/react-hooks';

const DeleteButton = props => {
  const { postId, onDeleteCallback } = props;
  const [confirmOpen, setConfirmOpen] = useState(false);
  const [deletePost] = useMutation(DELETE_POST_MUTATION, {
    update: (proxy) => {
      setConfirmOpen(false);

      const data = { ...proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      })};

      data.getPosts = data.getPosts.filter(post => post.id !== postId);

      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data,
      });

      if (onDeleteCallback) {
        onDeleteCallback();
      }
    },
    variables: { postId },
  });

  return (
    <div>
      <Button
        as='div'
        color='red'
        floated='right'
        onClick={() => setConfirmOpen(true)}
      >
        <Icon name='trash' style={{ margin: 0 }} />
      </Button>

      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deletePost}
      />
    </div>
  );
};

export default DeleteButton;
