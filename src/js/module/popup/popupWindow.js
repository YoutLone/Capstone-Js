import generateCommentHTML from './commentshow.js';

const generatePopupContent = (data, comments) => {
  const commentsHTML = comments
    .map((comment) => generateCommentHTML(comment))
    .join('');

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
    ${commentsHTML}
  `;
};

export default generatePopupContent;
