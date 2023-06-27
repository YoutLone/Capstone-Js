import '../scss/styles.scss';
import Logo from '../assests/Logo.png';
import ListApi from './module/homePage.js';

const logo = document.querySelector('.logo');
const logoImage = new Image();
logoImage.src = Logo;

logo.appendChild(logoImage);
ListApi();
