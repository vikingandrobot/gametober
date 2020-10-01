import debounce from 'lodash.debounce';

import Player from './Player/Player';

const player = new Player();
player.pos = { x: 200, y: 0 };

const DELTA_T = parseInt(1000/60);

const env = {
  canvas: null,
  ctx: null,
  intervalId: null,
  controls: {
    left: false,
    right: false,
  },
};

function registerKeyListeners() {
  document.addEventListener('keydown', (e) => {
    const { controls } = env;
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

      default:
        break;
    }
  });

  document.addEventListener('keyup', (e) => {
    const { controls } = env;
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

      default:
        break;
    }
  });
}


function resizeGame() {
  env.canvas.width = window.innerWidth;
  env.canvas.height = window.innerHeight;
}

function core() {
  const { ctx } = env;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  player.logic(env);
  player.draw(env);
}

// Set up the game environment before running it
export function setup() {
  env.canvas = document.getElementById('gt-canvas');
  env.ctx = env.canvas.getContext('2d');
  resizeGame();

  registerKeyListeners();

  window.addEventListener('resize', debounce(() => {
    resizeGame();
  }, 100));
}

export function start() {
  env.intervalId = setInterval(() => core(), DELTA_T);
}

export function stop() {
  clearInterval(env.intervalId);
}
