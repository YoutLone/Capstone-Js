import '../scss/styles.scss';
import Logo from '../assests/Logo.png';
import ListApi from './module/homePageAPI.js';
import openPopup from './module/popup.js';

const logo = document.querySelector('.logo');
const logoImage = new Image();
logoImage.src = Logo;

logo.appendChild(logoImage);

ListApi();
openPopup();
