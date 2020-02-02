import React, { useContext, useState } from 'react';
import { Form } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import { Button } from "semantic-ui-react";
import gql from "graphql-tag";

import { useFormValues } from "../util/hooks";
import { AuthContext } from "../context/auth";

const Register = props => {
  const authContext = useContext(AuthContext);
  const { onFormValueChange, onFormSubmit, formValues } = useFormValues(addNewUser, {
    userName: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [registerErrors, setRegisterErrors] = useState({});

  const [registerUser, { data, loading, error }] = useMutation(REGISTER_USER, {
    update(proxy, result) {
      authContext.login(result.data.register);
      props.history.push('/');
    },
    onError(error) {
      setRegisterErrors(error.graphQLErrors[0].extensions.exception.errors);
    },
    variables: formValues,
  });

  function addNewUser() {
    return registerUser();
  }

  return (
    <div style={{ padding: 20 }}>
      <Form onSubmit={onFormSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Register</h1>

        <Form.Input
          label='Username'
          placeholder='Enter username'
          name='userName'
          type='string'
          error={registerErrors.userName}
          value={formValues.userName}
          onChange={onFormValueChange}
        />

        <Form.Input
          label='Email'
          placeholder='Enter email'
          name='email'
          type='email'
          error={registerErrors.email}
          value={formValues.email}
          onChange={onFormValueChange}
        />

        <Form.Input
          label='Password'
          placeholder='Enter password'
          name='password'
          type='password'
          value={formValues.password}
          error={registerErrors.password}
          onChange={onFormValueChange}
        />

        <Form.Input
          label='Confirm password'
          placeholder='Confirm password'
          name='confirmPassword'
          type='password'
          value={formValues.confirmPassword}
          error={registerErrors.confirmPassword}
          onChange={onFormValueChange}
        />

        <Button type='submit' primary>Register</Button>
      </Form>

      {Object.keys(registerErrors).length > 0 && (
        <div className="ui error message">
          <ul className='list'>
            {Object.values(registerErrors).map(value => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

const REGISTER_USER = gql`
  mutation registerUser ($userName: String!, $email: String!, $password: String!, $confirmPassword: String!) {
    register ( registerInput: { userName: $userName, email: $email, password: $password, confirmPassword: $confirmPassword} ) {
      id
      userName
      email
      token
      createdAt
    }
  }
`;

export default Register;
