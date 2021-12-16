import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const test = screen.queryByText(/p/i);
  const test2 = screen.queryAllByPlaceholderText(/category/i);

  expect(test).toBeInTheDocument();
  expect(test2).toBeInTheDocument();
});
