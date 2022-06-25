import { render } from '@testing-library/react';
import Button from './Button';

describe('Button Component', () => {
  it('Render Button', () => {
    const { getByTestId } = render(<Button />);
    const button = getByTestId('randomizeButton');
    expect(button).toBeTruthy();
  });
});
