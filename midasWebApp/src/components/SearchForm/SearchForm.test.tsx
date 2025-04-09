import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import userEvent from '@testing-library/user-event';
import SearchForm from './SearchForm';

describe('SearchForm', () => {
  it('renders the form with all input fields and a submit button', () => {
    render(<SearchForm onSearch={jest.fn()} />);

    expect(screen.getByLabelText('Document ID')).toBeInTheDocument();
    expect(screen.getByLabelText('Source')).toBeInTheDocument();
    expect(screen.getByLabelText('Search documents')).toBeInTheDocument();
  });

  it('shows an error message if required fields are missing', async () => {
    render(<SearchForm onSearch={jest.fn()} />);

    const searchButton = screen.getByLabelText('Search documents');
    await userEvent.click(searchButton);

    expect(screen.getByRole('alert')).toHaveTextContent('Please provide at least a Doc ID or Source to search.');
  });

  it('calls the onSearch function with correct parameters when the form is submitted', async () => {
    const mockOnSearch = jest.fn();
    render(<SearchForm onSearch={mockOnSearch} />);

    const docIdInput = screen.getByLabelText('Document ID');
    const sourceInput = screen.getByLabelText('Source');
    const searchButton = screen.getByLabelText('Search documents');

    await userEvent.type(docIdInput, '12345');
    await userEvent.type(sourceInput, 'System A');
    await userEvent.click(searchButton);

    expect(mockOnSearch).toHaveBeenCalledWith({ docId: '12345', source: 'System A' });
  });
});