import generatePopupContent from '../popup/popupWindow.js';

jest.mock('../popup/commentshow.js', () => ({
  __esModule: true,
  default: jest.fn(
    (comment) => `<div class="comment">Comment ${comment.id}</div>`,
  ),
}));

test('generatePopupContent should generate correct popup content', () => {
  const data = {
    image: { medium: 'image.jpg' },
    name: 'John Doe',
    gender: 'Male',
    country: { name: 'Country', timezone: 'Timezone' },
  };

  const comments = [
    { id: 1, username: 'user1', comment: 'Comment 1' },
    { id: 2, username: 'user2', comment: 'Comment 2' },
    { id: 3, username: 'user3', comment: 'Comment 3' },
  ];

  const generatedHTML = generatePopupContent(data, comments);

  expect(generatedHTML).toMatchSnapshot();
});
