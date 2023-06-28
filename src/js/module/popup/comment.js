import { TvAPI } from '../API/API.js';
import openPopup from './popup.js';

const generateCardHtml = (data) => `
    <div class="card col mt-3">
      <img src="${data.image.medium}" alt="#" class="mt-2"/>
      <p class="mt-2">${data.name}</p>
      <i class="fa-solid fa-heart"></i>
      <p> Likes</p>
      <button class="btn btn-outline-primary btn-lg mt-2 mb-3 comment-button" data-tvapi="${TvAPI}${data.id}"  type="button">Comment</button>
    </div>
  `;

const attachCommentButtonListeners = () => {
  const commentButtons = document.querySelectorAll('.comment-button');
  commentButtons.forEach((button) => {
    button.addEventListener('click', async () => {
      const tvApi = button.getAttribute('data-tvapi');
      const response = await fetch(tvApi);
      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }
      const data = await response.json();
      openPopup(data);
    });
  });
};

export { generateCardHtml, attachCommentButtonListeners };
