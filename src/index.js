import debounce from 'lodash.debounce';

import { setup as desktopSetup, start as desktopStart } from './Game/DesktopGame';
import { setup as mobileSetup, start as mobileStart } from './Game/MobileGame';
import { waitForImagesToBeLoaded } from './Game/ImageLoader';

import './index.scss';

const handlePlayDesktop = debounce(() => {
  desktopSetup();
  desktopStart();
  hideWelcomeScreen();
  displayGameScreen();
  document.getElementById('gt-instructions')
      .classList.add("active");
},  500, { leading: true, trailing: false });
const handlePlayMobile = debounce(() => {
  mobileSetup();
  mobileStart();
  hideWelcomeScreen();
  displayGameScreen();
},  500, { leading: true, trailing: false });

function displayWelcomeScreen() {
  document.getElementById('gt-device-choice-screen')
    .classList.add("active");
  document.getElementById("gt-device-choice-screen-desktop")
    .addEventListener("click", handlePlayDesktop);
  document.getElementById("gt-device-choice-screen-mobile")
    .addEventListener("click", handlePlayMobile);
}

function hideWelcomeScreen() {
  document.getElementById("gt-device-choice-screen-desktop")
    .removeEventListener("click", handlePlayDesktop);
  document.getElementById("gt-device-choice-screen-mobile")
    .removeEventListener("click", handlePlayMobile);
  document.getElementById('gt-device-choice-screen')
    .classList.remove("active");
}

function displayGameScreen() {
  document.getElementById('gt-root')
    .classList.add("active");
}

waitForImagesToBeLoaded()
  .then(() => {
    displayWelcomeScreen();
  });
