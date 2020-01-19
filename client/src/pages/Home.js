import React from 'react';
import { useQuery } from "@apollo/react-hooks";
import gql from 'graphql-tag';
import { Grid } from "semantic-ui-react";

import PostCard from "../components/PostCard";

const Home = () => {
  const { loading, error, data } = useQuery(FETCH_POSTS_QUERY);

  return (
    <div style={{ padding: '20px' }}>
      <Grid columns={3} divided>
        <Grid.Row style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
          <h1>Recent posts</h1>
        </Grid.Row>

        <Grid.Row>
          {loading && (<div>Loading posts...</div>)}

          {error && (<div>There is an error.</div>)}

          {data && data.getPosts.map(post =>
            <Grid.Column key={post.id} style={{ marginBottom: 20 }}>
              <PostCard post={post} />
            </Grid.Column>
          )}
        </Grid.Row>
      </Grid>
    </div>
  );
};

const FETCH_POSTS_QUERY = gql`
  query {
    getPosts {
      id
      body
      createdAt
      userName
      likeCount
      likes {
        userId
        userName
      }
      commentCount
      comments {
        id
        body
        userId
        userName
      }
    }
  }
`;

export default Home;
