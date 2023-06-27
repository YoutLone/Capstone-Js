import "../scss/styles.scss";
import Logo from "../assests/Logo.png";

const logo = document.querySelector(".logo");
const logoImage = new Image();
logoImage.src = Logo;

logo.appendChild(logoImage);
