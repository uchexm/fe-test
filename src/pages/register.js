import React, { useContext, useState } from "react";
import { AuthContext } from "../context/authContext";
import { useMutation } from "@apollo/client";
import { useForm } from "../utility/hooks";
import { useNavigate } from "react-router-dom";
import { gql } from 'graphql-tag';

const REGISTER_USER = gql`
  mutation Mutation(
    $registerInput: RegisterInput
  ) {
    registerUser(
      registerInput: $registerInput
    ) {
      email
      username
      token
    }
  }
`;

function Register(props) {
  const context = useContext(AuthContext);
  let navigate = useNavigate();
  const [errors, setErrors] = useState([]);

  function registerUserCallback() {
    registerUser();
  }

  const { onChange, onSubmit, values } = useForm(registerUserCallback, {
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const [registerUser, { loading }] = useMutation(REGISTER_USER, {
    update(proxy, { data: { registerUser: userData } }) {
      context.login(userData);
      navigate('/');
    },
    onError({ graphQLErrors }) {
      setErrors(graphQLErrors);
    },
    variables: { registerInput: values }
  });

  return (
    <div className="container mt-5 mx-auto" style={{ maxWidth: "400px" }}>
      <h3>Register</h3>
      <p>Register below to create an account!</p>
      <form onSubmit={onSubmit}>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Username</label>
          <input type="text" className="form-control" id="username" name="username" onChange={onChange} value={values.username} placeholder="Nickname" />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" name="email" onChange={onChange} value={values.email} placeholder="name@example.com" />
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="password" onChange={onChange} value={values.password} placeholder="password" />
        </div>
        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Confirm Password</label>
          <input type="password" className="form-control" id="confirmPassword" name="confirmPassword" onChange={onChange} value={values.confirmPassword} placeholder="password" />
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

export default Register;
