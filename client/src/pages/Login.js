import React, { useContext, useState } from 'react';
import { Form } from "semantic-ui-react";
import { useMutation } from "@apollo/react-hooks";
import { Button } from "semantic-ui-react";

import { useFormValues } from "../util/hooks";
import { AuthContext } from "../context/auth";
import { LOGIN_USER } from "../util/graphql";

const Login = props => {
  const authContext = useContext(AuthContext);
  const { onFormValueChange, onFormSubmit, formValues } = useFormValues(loginCurrentUser, {
    userName: '',
    password: '',
  });

  const [loginErrors, setLoginErrors] = useState({});
  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, result) {
      authContext.login(result.data.login);
      props.history.push('/');
    },
    onError(error) {
      setLoginErrors(error.graphQLErrors[0].extensions.exception.errors);
    },
    variables: formValues,
  });

  function loginCurrentUser() {
    return loginUser();
  }

  return (
    <div style={{ padding: 20 }}>
      <Form onSubmit={onFormSubmit} noValidate className={loading ? 'loading' : ''}>
        <h1>Login</h1>

        <Form.Input
          label='Username'
          placeholder='Enter username'
          name='userName'
          type='string'
          error={loginErrors.userName}
          value={formValues.userName}
          onChange={onFormValueChange}
        />

        <Form.Input
          label='Password'
          placeholder='Enter password'
          name='password'
          type='password'
          error={loginErrors.password}
          value={formValues.password}
          onChange={onFormValueChange}
        />

        <Button type='submit' primary>Login</Button>
      </Form>

      {Object.keys(loginErrors).length > 0 && (
        <div className="ui error message">
          <ul className='list'>
            {Object.values(loginErrors).map(value => (
              <li key={value}>{value}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Login;
