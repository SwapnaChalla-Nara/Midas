import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Provider } from 'react-redux';
import { store } from './store/store';
import App from './App';

// Mock the API call
jest.mock('./store/features/searchSlice', () => ({
  ...jest.requireActual('./store/features/searchSlice'),
  startSearch: jest.fn(),
  searchSuccess: jest.fn(),
  searchFailure: jest.fn(),
}));

describe('App Component', () => {
  it('renders the App component with SearchForm and ResultsGrid', () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Check if the title is rendered
    expect(screen.getByText('Document Search System')).toBeInTheDocument();

    // Check if SearchForm is rendered
    expect(screen.getByLabelText('Document ID')).toBeInTheDocument();
    expect(screen.getByLabelText('Source')).toBeInTheDocument();

    // Check if ResultsGrid is rendered
    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });

  it('displays a loading spinner when a search is initiated', async () => {
    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Simulate a search
    fireEvent.click(screen.getByLabelText('Search documents'));

    // Check if the loading spinner is displayed
    expect(screen.getByLabelText('Loading results')).toBeInTheDocument();
  });

  it('displays an error message if the API call fails', async () => {
    // Mock a failed API call
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.reject(new Error('Network error: Failed to fetch results.'))
    );

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Simulate a search
    fireEvent.click(screen.getByLabelText('Search documents'));

    // Wait for the error message to appear
    await waitFor(() => {
      expect(screen.getByRole('alert')).toHaveTextContent('Network error: Failed to fetch results.');
    });

    // Restore the original fetch implementation
    jest.restoreAllMocks();
  });

  it('renders results in ResultsGrid after a successful API call', async () => {
    // Mock a successful API call
    jest.spyOn(global, 'fetch').mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () =>
          Promise.resolve([
            {
              docId: '1',
              source: 'System A',
              aNumber: 'A123',
              cNumber: 'C456',
              folderName: 'Folder 1',
              access: true,
            },
            {
              docId: '2',
              source: 'System B',
              aNumber: 'A789',
              cNumber: 'C012',
              folderName: 'Folder 2',
              access: false,
            },
          ]),
      })
    );

    render(
      <Provider store={store}>
        <App />
      </Provider>
    );

    // Simulate a search
    fireEvent.click(screen.getByLabelText('Search documents'));

    // Wait for the results to appear
    await waitFor(() => {
      expect(screen.getByText('System A')).toBeInTheDocument();
      expect(screen.getByText('System B')).toBeInTheDocument();
    });

    // Restore the original fetch implementation
    jest.restoreAllMocks();
  });
});