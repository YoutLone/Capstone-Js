import openPopup from './popup.js';
import { TvAPI } from './API.js';

const home = document.getElementById('card');

const id = 6; // Set the desired range of IDs, e.g., from 1 to 10

const generateCardHtml = (data) => `
    <div class="card col mt-3">
      <img src="${data.image.medium}" alt="#" class="mt-2"/>
      <p class="mt-2">${data.name}</p>
      <i class="fa-solid fa-heart"></i>
      <p> Likes</p>
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

const ListApi = async () => {
  const fetchPromises = Array.from({ length: id }, (_, i) => i + 1)
    .map((i) => `${TvAPI}${i}`)
    .map((tvApi) => fetch(tvApi));

  try {
    const responses = await Promise.all(fetchPromises);

    await Promise.all(
      responses.map(async (response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        const cardHtml = generateCardHtml(data);
        home.innerHTML += cardHtml;
      }),
    );

    attachCommentButtonListeners(); // Attach event listeners after the buttons are added to the DOM
  } catch (err) {
    throw new Error(`${err}`);
  }
};

export default ListApi;
