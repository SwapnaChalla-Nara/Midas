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
    imageUrl: 'https://catalog.archives.gov/iiif/3/lz%2Fpresidential-libraries%2Fobama%2Fbho-ero%2F217847615%2FTwitter_Gabi-Chojkier_2016-03-21_05_01.jpg/0,0,1024,1024/512,512/0/default.jpg',
    filePath: '/path/to/folder1',
  },
  {
    docId: '2',
    source: 'System B',
    aNumber: 'A789',
    cNumber: 'C012',
    folderName: 'Folder 2',
    access: false,
    imageUrl: 'https://catalog.archives.gov/iiif/3/lz%2Fpresidential-libraries%2Fobama%2Fbho-ero%2F217847615%2FTwitter_Gabi-Chojkier_2015-04-16_02_01.jpg/0,0,1024,1024/512,512/0/default.jpg',
    filePath: '/path/to/folder2',
  },
];

describe('ResultsGrid', () => {
  it('renders a loading indicator when loading is true', () => {
    render(<ResultsGrid results={[]} loading={true} onToggleAccess={jest.fn()} showGrid={true} />);

    expect(screen.getByLabelText('Loading results')).toBeInTheDocument();
  });

  it('renders "No results found" when results are empty', () => {
    render(<ResultsGrid results={[]} loading={false} onToggleAccess={jest.fn()} showGrid={true} />);

    expect(screen.getByText('No results found.')).toBeInTheDocument();
  });

  it('renders the results table with correct data', () => {
    render(<ResultsGrid results={mockResults} loading={false} onToggleAccess={jest.fn()} showGrid={true} />);

    expect(screen.getByText('System A')).toBeInTheDocument();
    expect(screen.getByText('System B')).toBeInTheDocument();
    expect(screen.getByText('A123')).toBeInTheDocument();
    expect(screen.getByText('C012')).toBeInTheDocument();
  });

  it('calls onToggleAccess when the "Set Access" button is clicked', () => {
    const mockOnToggleAccess = jest.fn();
    render(<ResultsGrid results={mockResults} loading={false} onToggleAccess={mockOnToggleAccess} showGrid={true} />);

    const toggleButton = screen.getByLabelText('Toggle access for document 1');
    fireEvent.click(toggleButton);

    expect(mockOnToggleAccess).toHaveBeenCalledWith('1');
  });

  it('opens the modal with the correct image when the "View" button is clicked', () => {
    render(<ResultsGrid results={mockResults} loading={false} onToggleAccess={jest.fn()} showGrid={true} />);

    const viewButton = screen.getByLabelText('View image');
    fireEvent.click(viewButton);

    // Check if the modal opens with the correct image
    const modalImage = screen.getByAltText('Modal Content');
    expect(modalImage).toBeInTheDocument();
    expect(modalImage).toHaveAttribute('src', mockResults[0].imageUrl);
  });

  it('opens the modal with the correct folder path when the "Folder" button is clicked', () => {
    render(<ResultsGrid results={mockResults} loading={false} onToggleAccess={jest.fn()} showGrid={true} />);

    const folderButton = screen.getByLabelText('Open folder');
    fireEvent.click(folderButton);

    // Check if the modal opens with the correct folder path
    expect(screen.getByText(mockResults[0].filePath)).toBeInTheDocument();
  });
});