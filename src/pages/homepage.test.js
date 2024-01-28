import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { AuthContext } from '../context/authContext';
import Homepage from './homepage';

describe('Homepage Component', () => {
  test('renders welcome message and login/register links when user is not logged in', () => {
    render(
      <Router>
        <AuthContext.Provider value={{ user: null }}>
          <Homepage />
        </AuthContext.Provider>
      </Router>
    );

    expect(screen.getByText('Welcome to Full Stack Test Movie Data')).toBeTruthy();
    expect(screen.getByText('Login')).toBeTruthy();
    expect(screen.getByText('Register')).toBeTruthy();
  });

});
