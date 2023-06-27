import { TvAPI } from './API.js';

const home = document.getElementById('card');
const id = 6; // Set the desired range of IDs, e.g., from 1 to 10
const ListApi = async () => {
  const fetchPromises = [];
  for (let i = 1; i <= id; i = +1) {
    const tvApi = `${TvAPI}${i}`;
    const fetchPromise = fetch(tvApi)
      .then((response) => {
        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        return response.json();
      })
      .catch((err) => {
        throw new Error(`An error occurred: ${err}`);
      });
    fetchPromises.push(fetchPromise);
  }
  const responses = await Promise.all(fetchPromises);
  responses.forEach((data) => {
    // Create the card HTML
    const cardHtml = `
      <div class="card col mt-3">
        <img src="${data.image.medium}" alt="#" class="mt-2"/>
        <p class="mt-2">${data.name}</p>
        <i class="fa-solid fa-heart"></i>
        <p> Likes</p>
        <button class="btn btn-outline-primary btn-sm mt-2 mb-3" type="submit">Comment</button>
      </div>
    `;
    // Append the card HTML to the home element
    home.innerHTML += cardHtml;
  });
};
export default ListApi;