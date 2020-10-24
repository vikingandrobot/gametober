import NippleJS from 'nipplejs';




function registerTouchListeners(env) {
  document.getElementById('gt-mobile-controls')
    .classList.add("mobile-enabled");

  const joystickContainer = document.getElementById('gt-mobile-controls-joystick');


  const manager = NippleJS.create({
    zone: joystickContainer,
    mode: 'static',
    position: {
      top: '50%',
      left: '50%',
    },
  });
  manager.on('dir:left', () => {
    const { controls } = env;
    controls.left = true;
    controls.right = false;
    controls.down = false;
  });
  manager.on('dir:right', () => {
    const { controls } = env;
    controls.left = false;
    controls.right = true;
    controls.down = false;
  });
  manager.on('dir:down', () => {
    const { controls } = env;
    controls.down = true;
    controls.left = false;
    controls.right = false;
  });
  manager.on('dir:up', () => {
    const { controls } = env;
    controls.left = false;
    controls.right = false;
    controls.down = false;
  });
  manager.on('end', () => {
    const { controls } = env;
    controls.left = false;
    controls.right = false;
    controls.down = false;
  });

  document.getElementById("gt-mobile-controls-button-a").addEventListener("touchstart", function() {
    const { controls } = env;
    controls.up = true;
  });
  document.getElementById("gt-mobile-controls-button-a").addEventListener("touchend", function() {
    const { controls } = env;
    controls.up = false;
  });

  document.getElementById("gt-mobile-controls-button-b").addEventListener("touchstart", function() {
    const { controls } = env;
    controls.action = true;
  });
  document.getElementById("gt-mobile-controls-button-b").addEventListener("touchend", function() {
    const { controls } = env;
    controls.action = false;
  });
}

export default registerTouchListeners;
