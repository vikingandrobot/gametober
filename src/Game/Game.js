import debounce from 'lodash.debounce';

import { everything, spawn } from './World/World';
import Player from './Player/Player';
import Ground from './World/Ground';


const player = new Player();
player.pos = { x: 200, y: 100 };

const ground = new Ground({ x: -100, y: -57}, { width: 4000, height: 157 });
spawn(ground);

const DELTA_T = parseInt(1000/50);

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
  const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
  const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

  env.canvas.width = vw;
  env.canvas.height = vh;
}

function core() {
  const { ctx } = env;
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  everything.forEach(el => el.logic());
  player.logic(env);
  player.draw(env);
  everything.forEach(el => el.draw(env));
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
