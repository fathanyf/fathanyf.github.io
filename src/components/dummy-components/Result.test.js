import { render } from '@testing-library/react';
import Result from './Result';

describe('Button Component', () => {
  it('Render Result', () => {
    const { getByTestId } = render(<Result />);
    const result = getByTestId('resultLine');
    expect(result).toBeTruthy();
  });
});
