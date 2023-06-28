import { TvAPI, baseUrl, appId } from '../API/API.js';
import openPopup from './popup.js';

const generateCardHtml = (data) => `
  <div class="card col mt-3">
    <img src="${data.image.medium}" alt="#" class="mt-2"/>
    <p class="mt-2">${data.name}</p>
    <i class="fa-regular fa-heart like-button" id="${data.id}"></i>
    <p class="like-count" id="${data.id}">0 Likes</p>
    <button class="btn btn-outline-primary btn-lg mt-2 mb-3 comment-button" data-tvapi="${TvAPI}${data.id}">Comment</button>
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

const getReaction = async () => {
  const url = `${baseUrl}${appId}/likes`;
  const result = await fetch(`${url}`);
  const data = await result.json();
  return data;
};

const displayReaction = async (likeCounts) => {
  const totalLikes = await getReaction();
  totalLikes.forEach((totalLike) => {
    likeCounts.forEach((likeCount) => {
      if (totalLike.item_id === likeCount.id) {
        likeCount.textContent = `${totalLike.likes} likes`;
      }
    });
  });
};

const sendReactionToApi = async (likeBtn, likeCounts) => {
  likeBtn.addEventListener('click', async (e) => {
    const reactions = { item_id: `${e.target.id}` };
    const url = `${baseUrl}${appId}/likes`;
    const requestOptions = {
      method: 'POST',
      headers: {
        'content-type': 'application/json; charset=UTF-8',
      },
      body: JSON.stringify(reactions),
    };

    await fetch(`${url}`, requestOptions);
    displayReaction(likeCounts);
  });
};

const attachLikeButtonListeners = () => {
  const likeButtons = document.querySelectorAll('.like-button');
  const likeCounts = document.querySelectorAll('.like-count');
  likeButtons.forEach((likeButton) => sendReactionToApi(likeButton, likeCounts));
  displayReaction(likeCounts);
};

export { generateCardHtml, attachCommentButtonListeners, attachLikeButtonListeners };