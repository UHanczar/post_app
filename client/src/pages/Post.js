import React, { useContext, useRef, useState } from 'react';
import { useMutation, useQuery } from '@apollo/react-hooks';
import { Grid, Form, Image, Card, Label } from 'semantic-ui-react';
import moment from 'moment';

import { CREATE_COMMENT_MUTATION, FETCH_POST_QUERY } from '../util/graphql';
import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import DeleteButton from '../components/DeleteButton';
import CustomPopup from '../util/CustomPopup';

const Post = props => {
  const { postId } = props.match.params;
  const { user } = useContext(AuthContext);
  const commentInputRef = useRef(null);
  const [comment, setComment] = useState('');

  const { data, loading } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  const [createComment] = useMutation(CREATE_COMMENT_MUTATION, {
    update: () => {
      setComment('');
      commentInputRef.current.blur();
    },
    variables: {
      postId,
      body: comment,
    }
  });

  const onCommentButtonClick = () => commentInputRef.current.focus();

  const deleteButtonCallback = () => props.history.push('/');

  let postMarkup;
  if (loading) {
    postMarkup = (<div>Loading...</div>);
  } else {
    const { getPost: { id, userName, body, createdAt, likeCount, likes, comments, commentCount } } = data;

    postMarkup = (
      <Grid>
        <Grid.Row>
          <Grid.Column width={2}>
            <Image
              src='https://react.semantic-ui.com/images/avatar/large/molly.png'
              size='small'
              float='right'
            />
          </Grid.Column>

          <Grid.Column width='10'>
            <Card fluid>
              <Card.Content>
                <Card.Header>{userName}</Card.Header>

                <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>

                <Card.Description>{body}</Card.Description>
              </Card.Content>

              <hr />

              <Card.Content extra>
                <LikeButton
                  user={user}
                  postId={id}
                  likes={likes}
                  likeCount={likeCount}
                />

                <CustomPopup content='Write a comment'>
                  <Button
                    as='div'
                    labelPosition='right'
                    onClick={onCommentButtonClick}
                  >
                    <Button
                      basic
                      color='blue'
                    >
                      <Icon name='comments' />
                    </Button>

                    <Label basic color='blue' pointing='left'>{commentCount}</Label>
                  </Button>
                </CustomPopup>

                {user && user.userName === userName && (
                  <DeleteButton postId={id} onDeleteCallback={deleteButtonCallback} />
                )}
              </Card.Content>

              {user && (
                <Card fluid>
                  <Card.Content>
                    <p>Post a comment</p>

                    <Form>
                      <div className='ui action input fluid'>
                        <input
                          type='text'
                          name='comment'
                          placeholder='Comment...'
                          ref={commentInputRef}
                          value={comment}
                          onChange={event => setComment(event.target.value)}
                        />

                        <button
                          type='submit'
                          className='ui button teal'
                          disabled={comment.trim() === ''}
                          onClick={createComment}
                        >
                          Submit
                        </button>
                      </div>
                    </Form>
                  </Card.Content>
                </Card>
              )}

              {comments.map(comment => (
                <Card fluid key={comment.id}>
                  <Card.Content>
                    {user && user.userName === userName && (
                      <DeleteButton postId={id} commentId={comment.id} />
                    )}

                    <Card.Header>{comment.userName}</Card.Header>

                    <Card.Meta>{moment(comment.createdAt).fromNow()}</Card.Meta>

                    <Card.Description>{comment.body}</Card.Description>
                  </Card.Content>
                </Card>
              ))}
            </Card>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }

  return (
    <div>
      {postMarkup}
    </div>
  );
};

export default Post;
