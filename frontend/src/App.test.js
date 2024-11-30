import { render, screen } from '@testing-library/react';
import App from './App';

test('renders ImageUpload component', () => {
  render(<App />);
  const imageUploadElement = screen.getByTestId('image-upload'); // Assuming you add a testId to ImageUpload
  expect(imageUploadElement).toBeInTheDocument();
});