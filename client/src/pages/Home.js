import React, { useContext } from 'react';
import { useQuery } from "@apollo/react-hooks";
import { Grid } from "semantic-ui-react";

import { AuthContext } from "../context/auth";
import PostCard from "../components/PostCard";
import PostForm from "../components/PostForm";
import { FETCH_POSTS_QUERY } from "../util/graphql";

const Home = () => {
  const { user } = useContext(AuthContext);
  const { loading, error, data } = useQuery(FETCH_POSTS_QUERY);

  return (
    <div style={{ padding: '20px' }}>
      <Grid columns={3} divided>
        <Grid.Row style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', marginTop: 10 }}>
          <h1>Recent posts</h1>
        </Grid.Row>

        <Grid.Row>
          {user && (
            <Grid.Column>
              <PostForm />
            </Grid.Column>
          )}
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

export default Home;
