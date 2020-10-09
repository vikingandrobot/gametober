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
  });
  manager.on('dir:right', () => {
    const { controls } = env;
    controls.left = false;
    controls.right = true;
  });
  manager.on('dir:up,dir:down', () => {
    const { controls } = env;
    controls.left = false;
    controls.right = false;
  });
  manager.on('end', () => {
    const { controls } = env;
    controls.left = false;
    controls.right = false;
  });

  document.getElementById("gt-mobile-controls-button-a").addEventListener("touchstart", function() {
    const { controls } = env;
    controls.up = true;
  });
  document.getElementById("gt-mobile-controls-button-a").addEventListener("touchend", function() {
    const { controls } = env;
    controls.up = false;
  });
}

export default registerTouchListeners;
