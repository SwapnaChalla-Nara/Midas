import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ResultsGrid from './ResultsGrid';

const mockResults = [
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
];

describe('ResultsGrid', () => {
  it('renders a loading indicator when loading is true', () => {
    render(<ResultsGrid results={[]} loading={true} onToggleAccess={jest.fn()} />);

    expect(screen.getByLabelText('Loading results')).toBeInTheDocument();
  });

  it('renders "No results found" when results are empty', () => {
    render(<ResultsGrid results={[]} loading={false} onToggleAccess={jest.fn()} />);

    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });

  it('renders the results table with correct data', () => {
    render(<ResultsGrid results={mockResults} loading={false} onToggleAccess={jest.fn()} />);

    expect(screen.getByText('System A')).toBeInTheDocument();
    expect(screen.getByText('System B')).toBeInTheDocument();
    expect(screen.getByText('A123')).toBeInTheDocument();
    expect(screen.getByText('C012')).toBeInTheDocument();
  });

  it('calls onToggleAccess when the "Set Access" button is clicked', () => {
    const mockOnToggleAccess = jest.fn();
    render(<ResultsGrid results={mockResults} loading={false} onToggleAccess={mockOnToggleAccess} />);

    const toggleButton = screen.getByLabelText('Toggle access for document 1');
    fireEvent.click(toggleButton);

    expect(mockOnToggleAccess).toHaveBeenCalledWith('1');
  });
});