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
    // Mock the AuthContext value to simulate a logged-in user
    const mockContextValue = {
      user: {
        // Mock user data if needed
      }
    };

  });

  it('calls logout function when logout link is clicked', () => {
    // Mock the AuthContext value with a mock logout function
    const mockLogout = jest.fn();
    const mockContextValue = {
      user: {
        // Mock user data if needed
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

    // Use a regular expression to match the logout link text
    const logoutLink = screen.getByText(/Logout/i); // 'i' flag for case-insensitive matching
    fireEvent.click(logoutLink);

    // Assert that the logout function has been called
    expect(mockLogout).toHaveBeenCalled();
  });
});
