import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders logo', () => {
  render(<App />);
  const logoElement = screen.getByAltText('logo');
  expect(logoElement).toBeInTheDocument();
});

test('renders header', () => {
  render(<App />);
  const headerElement = screen.getByRole('heading', { name: /edit src\/App\.tsx and save to reload\./i });
  expect(headerElement).toBeInTheDocument();
});

test('renders paragraph', () => {
  render(<App />);
  const paragraphElement = screen.getByText(/edit src\/App\.tsx and save to reload\./i);
  expect(paragraphElement).toBeInTheDocument();
});

test('renders link to React website', () => {
  render(<App />);
  const reactLinkElement = screen.getByRole('link', { name: /learn react/i });
  expect(reactLinkElement).toHaveAttribute('href', 'https://reactjs.org');
  expect(reactLinkElement).toHaveAttribute('target', '_blank');
  expect(reactLinkElement).toHaveAttribute('rel', 'noopener noreferrer');
});