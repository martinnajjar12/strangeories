import Form from '../pages/story/new';
import { render, screen } from '@testing-library/react';

describe('New Story Page', () => {
  it('should render CREATE STORY on the document', () => {
    render(<Form />);
    expect(screen.getByRole('button')).toHaveTextContent('Create Story');
  });
});
