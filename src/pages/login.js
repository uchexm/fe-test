import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useMutation } from "@apollo/client";
import { useForm } from "../utility/hooks";
import { useNavigate } from "react-router-dom";
import { gql } from 'graphql-tag';

const LOGIN_USER = gql`
  mutation login(
    $loginInput: LoginInput
  ){
    loginUser(
      loginInput: $loginInput
    ){
      email
      username
      token
    }
  }
`;

function Login(props) {
  const navigate = useNavigate();
  const context = useContext(AuthContext);
  const [errors, setErrors] = useState([]);

  const loginUserCallback = () => {
    loginUser();
  }

  const { onChange, onSubmit, values } = useForm(loginUserCallback, {
    email: '',
    password: ''
  });

  const [loginUser, { loading }] = useMutation(LOGIN_USER, {
    update(proxy, { data: { loginUser: userData } }) {
      context.login(userData);
      navigate('/');
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    variables: { loginInput: values }
  });

  return (
    <div className="container mt-5 mx-auto" style={{ maxWidth: "400px" }}>
      <h3>Login</h3>
      <p>Register below to create an account!</p>
      <form onSubmit={onSubmit}>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" onChange={onChange} value={values.email} placeholder="name@example.com" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={onChange} value={values.password} placeholder="password" />
        </div>
        <button type="submit" className="btn btn-dark">Submit</button>
      </form>
      {errors.map(function (error, index) {
        return (
          <div key={index} className="alert alert-danger" role="alert">
            {error.message}
          </div>
        );
      })}
    </div>
  );
}

export default Login;
