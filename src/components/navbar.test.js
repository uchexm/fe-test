import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import Navbar from './navbar';
import { AuthContext } from '../context/authContext';


describe('Navbar Component', () => {
  it('renders without crashing', () => {
    render(
      <Router>
        <Navbar />
      </Router>
    );
  });

  it('displays the logout link when user is logged in', () => {

    const mockContextValue = {
      user: {

      }
    };

  });

  it('calls logout function when logout link is clicked', () => {

    const mockLogout = jest.fn();
    const mockContextValue = {
      user: {

      },
      logout: mockLogout
    };

    render(
      <Router>
        <AuthContext.Provider value={mockContextValue}>
          <Navbar />
        </AuthContext.Provider>
      </Router>
    );

    const logoutLink = screen.getByText(/Logout/i);
    fireEvent.click(logoutLink);

    expect(mockLogout).toHaveBeenCalled();
  });
});
