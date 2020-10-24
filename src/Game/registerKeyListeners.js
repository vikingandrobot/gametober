export default function registerKeyListeners(env) {
  const { controls } = env;
  document.addEventListener('keydown', (e) => {
    switch (e.keyCode) {
      case 37:
        controls.left = true;
        controls.right = false;
        break;

      case 38:
        controls.up = true;
        controls.down = false;
        break;

      case 39:
        controls.right = true;
        controls.left = false;
        break;

      case 40:
        controls.down = true;
        controls.up = false;
        break;

      case 32:
        controls.space = true;
        break;

      case 65:
        controls.action = true;
        break;

      default:
        break;
    }
  });

  document.addEventListener('keyup', (e) => {
    switch (e.keyCode) {
      case 37:
        controls.left = false;
        break;

      case 38:
        controls.up = false;
        break;

      case 39:
        controls.right = false;
        break;

      case 40:
        controls.down = false;
        break;

      case 32:
        controls.space = false;
        break;

      case 65:
        controls.action = false;
        break;

      default:
        break;
    }
  });
}
