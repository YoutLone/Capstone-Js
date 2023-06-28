import { baseUrl, appId } from '../API/API.js';
import generatePopupContent from './popupWindow.js';
import submitComment from './commentForm.js';

const itemId = 'item1';

const openPopup = (data, refreshPopup = () => {}) => {
  fetch(`${baseUrl}/${appId}/comments?item_id=${itemId}`)
    .then((res) => res.json())
    .then((comments) => {
      const popupContent = generatePopupContent(data, comments);
      const popup = document.getElementById('popup');
      popup.innerHTML = popupContent;

      if (data) {
        popup.style.display = 'block';
      }

      const commentForm = document.getElementById('comment-form');
      commentForm.addEventListener('submit', (event) => {
        event.preventDefault();
        submitComment(refreshPopup);
      });

      const closeBtn = document.querySelector('.close-btn');
      closeBtn.addEventListener('click', () => {
        popup.style.display = 'none';
      });
    })
    .catch((error) => {
      throw new Error(`Error occurred while fetching comments: ${error}`);
    });
};

const refreshPopup = () => {
  const data = null;
  openPopup(data, refreshPopup);
};

window.addEventListener('beforeunload', () => {
  const popup = document.getElementById('popup');
  popup.style.display = 'none';
});

window.addEventListener('load', () => {
  openPopup(null, refreshPopup);
});

export default openPopup;
