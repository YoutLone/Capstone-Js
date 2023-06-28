import { TvAPI, baseUrl } from './API.js';
import openPopup from './popup.js';

const generateCardHtml = (data) => `
  <div class="card col mt-3">
    <img src="${data.image.medium}" alt="#" class="mt-2"/>
    <p class="mt-2">${data.name}</p>
    <i class="fa-regular fa-heart like-button"></i>
    <p class="like-count">0 Likes</p>
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

const attachLikeButtonListeners = () => {
  const likeButtons = document.querySelectorAll('.like-button');
  likeButtons.forEach((likeButton) => {
    likeButton.addEventListener('click', async () => {
      const parentCard = likeButton.parentNode;
      const likeCount = parentCard.querySelector('.like-count');
      const currentLikes = parseInt(likeCount.textContent.split(' ')[0]); // Get the current number of likes
      const newLikes = currentLikes + 1; // Increment the like count by 1

      likeButton.classList.add('fas'); // Add the "fas" class to make the heart icon full
      likeButton.classList.remove('far'); // Remove the "far" class to make the heart icon outlined

      likeCount.textContent = `${newLikes} Likes`; // Update the like count on the screen

      const tvApi = likeButton.parentNode.querySelector('.comment-button').getAttribute('data-tvapi');
      const itemId = tvApi.substring(TvAPI.length);

      try {
        const likeResponse = await fetch(`${baseUrl}likes`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            item_id: itemId,
          }),
        });
        console.log(likeResponse);

        if (!likeResponse.ok) {
          throw new Error(`Like request failed with status ${likeResponse.status}`);
        }
      } catch (err) {
        console.error(err);
      }
    });
  });
};

export { generateCardHtml, attachCommentButtonListeners, attachLikeButtonListeners };
