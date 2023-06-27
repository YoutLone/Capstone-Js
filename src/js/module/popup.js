function generatePopupContent(data) {
  return `
      <div class="popup-content container">
        <i class="fa-solid fa-xmark close-btn"></i>
        <img src="${data.image.medium}" alt="#" class="popup-image" />
        <p class="popup-name">Name: ${data.name}</p>
        <p class="popup-gender">Gender: ${data.gender}</p>
        <p class="popup-country">Country: ${data.country.name}</p>
        <p class="popup-timezone">Timezone: ${data.country.timezone}</p>
      </div>
    `;
}

function openPopup(data) {
  const popupContent = generatePopupContent(data);

  const popup = document.getElementById('popup');
  popup.innerHTML = popupContent;
  popup.style.display = 'block';

  const closeBtn = document.querySelector('.close-btn');
  closeBtn.addEventListener('click', () => {
    popup.style.display = 'none';
  });
}

export default openPopup;
