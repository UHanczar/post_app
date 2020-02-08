import React from 'react';
import { Form } from "semantic-ui-react";

import { useFormValues } from "../util/hooks";
import { useMutation } from "@apollo/react-hooks";
import { CREATE_POST_MUTATION, FETCH_POSTS_QUERY } from "../util/graphql";

const PostForm = () => {
  const { formValues, onFormSubmit, onFormValueChange } = useFormValues(createPostCallback, {
    body: '',
  });

  const [createPost, { error }] = useMutation(CREATE_POST_MUTATION, {
    variables: formValues,
    update(proxy, result) {
      const data = { ...proxy.readQuery({
        query: FETCH_POSTS_QUERY,
      })};
      data.getPosts = [result.data.createPost, ... data.getPosts];
      proxy.writeQuery({
        query: FETCH_POSTS_QUERY,
        data,
      });
      formValues.body = '';
    }
  });

  function createPostCallback() {
    createPost();
  }

  return (
    <Form onSubmit={onFormSubmit}>
      <Form.Field>
        <Form.Input
          type='text'
          placeholder='Enter post!'
          name='body'
          value={formValues.body}
          onChange={onFormValueChange}
        />
      </Form.Field>
    </Form>
  );
};

export default PostForm;
