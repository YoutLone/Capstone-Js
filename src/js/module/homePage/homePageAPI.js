import {
  generateCardHtml,
  attachCommentButtonListeners,
} from '../popup/comment.js';

import { TvAPI } from '../API/API.js';

const home = document.getElementById('card');

const id = 6;

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

    attachCommentButtonListeners();
  } catch (err) {
    throw new Error(`${err}`);
  }
};

export default ListApi;
