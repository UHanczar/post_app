import React, { useState } from 'react';
import { Button, Confirm, Icon } from 'semantic-ui-react';

import { DELETE_COMMENT_MUTATION, DELETE_POST_MUTATION, FETCH_POSTS_QUERY } from '../util/graphql';
import { useMutation } from '@apollo/react-hooks';
import CustomPopup from '../util/CustomPopup';

const DeleteButton = props => {
  const { postId, commentId, onDeleteCallback } = props;
  const [confirmOpen, setConfirmOpen] = useState(false);
  const mutation = commentId ? DELETE_COMMENT_MUTATION : DELETE_POST_MUTATION;
  const [deleteItem] = useMutation(mutation, {
    update: (proxy) => {
      setConfirmOpen(false);

      if (!commentId) {
        const data = { ...proxy.readQuery({
            query: FETCH_POSTS_QUERY,
          })};

        data.getPosts = data.getPosts.filter(post => post.id !== postId);

        proxy.writeQuery({
          query: FETCH_POSTS_QUERY,
          data,
        });
      }

      if (onDeleteCallback) {
        onDeleteCallback();
      }
    },
    variables: { postId, commentId },
  });

  return (
    <div>
      <CustomPopup
        content={commentId ? 'Delete comment' : 'Delete post'}
      >
        <Button
          as='div'
          color='red'
          floated='right'
          onClick={() => setConfirmOpen(true)}
        >
          <Icon name='trash' style={{ margin: 0 }} />
        </Button>
      </CustomPopup>

      <Confirm
        open={confirmOpen}
        onCancel={() => setConfirmOpen(false)}
        onConfirm={deleteItem}
      />
    </div>
  );
};

export default DeleteButton;
