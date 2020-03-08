import React, { useContext } from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Grid, Image, Card, Label } from 'semantic-ui-react';
import moment from 'moment';

import { FETCH_POST_QUERY } from '../util/graphql';
import { AuthContext } from '../context/auth';
import LikeButton from '../components/LikeButton';
import Button from 'semantic-ui-react/dist/commonjs/elements/Button';
import Icon from 'semantic-ui-react/dist/commonjs/elements/Icon';
import DeleteButton from '../components/DeleteButton';

const Post = props => {
  const { postId } = props.match.params;
  const { user } = useContext(AuthContext);

  const { data, loading, error } = useQuery(FETCH_POST_QUERY, {
    variables: {
      postId,
    },
  });

  const onCommentButtonClick = () => console.log('ON_COMMENT_BUTTON_CLICK');

  const deleteButtonCallback = () => props.history.push('/');

  let postMarkup;
  if (loading) {
    postMarkup = (<div>Loading...</div>);
  } else {
    const { getPost: { id, userId, userName, body, createdAt, likeCount, likes, commentCount } } = data;

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

                {user && user.userName === userName && (
                  <DeleteButton postId={id} onDeleteCallback={deleteButtonCallback} />
                )}
              </Card.Content>
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
