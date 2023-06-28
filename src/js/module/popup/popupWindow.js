import generateCommentHTML from './commentshow.js';

const generatePopupContent = (data, comments) => {
  const uniqueComments = [
    ...new Set(comments.map((comment) => JSON.stringify(comment))),
  ].map((comment) => JSON.parse(comment));

  const commentsHTML = uniqueComments
    .map((comment) => generateCommentHTML(comment))
    .join('');

  const commentFormHTML = `
    <h2>Add a comment</h2>
    <form id="comment-form">
      <label for="name-input">Your name</label>
      <input type="text" id="name-input" placeholder="Enter your name" required>
      <label for="insights-input">Your insights</label>
      <input type="text" id="insights-input" placeholder="Enter your insights" required>
      <button id="comment-button" type="submit">Comment</button>
    </form>
  `;

  return `
    <div class="popup-content container">
      <i class="fa-solid fa-xmark close-btn"></i>
      ${
  data && data.image
    ? `<img src="${data.image.medium}" alt="#" class="popup-image" />`
    : ''
}
      <p class="popup-name">Name: ${data && data.name ? data.name : ''}</p>
      <p class="popup-gender">Gender: ${
  data && data.gender ? data.gender : ''
}</p>
      <p class="popup-country">Country: ${
  data && data.country && data.country.name ? data.country.name : ''
}</p>
      <p class="popup-timezone">Timezone: ${
  data && data.country && data.country.timezone
    ? data.country.timezone
    : ''
}</p>
    </div>
    <h2>Comments (${uniqueComments.length})</h2>
    ${commentsHTML}
    ${commentFormHTML}
  `;
};

export default generatePopupContent;
