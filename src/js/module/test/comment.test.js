import generateCommentHTML from '../popup/commentshow.js';

test('generateCommentHTML should generate correct comment HTML', () => {
  const comment = {
    creation_date: '2023-06-28',
    username: 'JohnDoe',
    comment: 'This is a test comment.',
  };

  const expectedHTML = `
  <div class="comment container">
    <p>${comment.creation_date} ${comment.username}: ${comment.comment}</p>
  </div>
`;

  const generatedHTML = generateCommentHTML(comment);

  expect(generatedHTML).toBe(expectedHTML);
});
