import { baseUrl, appId } from '../API/API.js';

const submitComment = (refreshPopup) => {
  const nameInput = document.getElementById('name-input');
  const insightsInput = document.getElementById('insights-input');

  const name = nameInput.value;
  const insights = insightsInput.value;

  const newComment = {
    item_id: 'item1',
    username: name,
    comment: insights,
  };

  fetch(`${baseUrl}/${appId}/comments`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newComment),
  })
    .then((response) => {
      if (response.status === 201) {
        nameInput.value = '';
        insightsInput.value = '';
        refreshPopup();
      } else {
        throw new Error('Error occurred while adding the comment');
      }
    })
    .catch((error) => {
      throw new Error(`Error occurred while adding the comment: ${error}`);
    });
};

export default submitComment;