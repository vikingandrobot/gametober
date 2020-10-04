import debounce from 'lodash.debounce';

import registerKeyListeners from './registerKeyListeners';

import Camera from './Camera/Camera';
import { gravity } from './World/World';
import Player from './Player/Player';
import Map from './World/Map';


const player = new Player([100, 300]);

const camera = new Camera('gt-canvas');

const env = {
  camera,
  intervalId: null,
  controls: {
    left: false,
    right: false,
  },
  time : {
    prevTimestamp: null,
    deltaT: null,
  },
  map: new Map(),
};

function resizeGame() {
  camera.resizeViewport();
}

function core(timestamp) {
  const { camera: { ctx }, time } = env;
  if (time.prevTimestamp) {
    time.deltaT = timestamp - time.prevTimestamp;
    time.prevTimestamp = timestamp;
  } else {
    time.prevTimestamp = timestamp;
    time.deltaT = 0;
  }
  ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  gravity(player, env);
  player.logic(env);
  camera.center(player.pos);
  player.draw(env);
  env.map.draw(env);
  camera.reset();
  env.animationId = requestAnimationFrame(core);
}

// Set up the game environment before running it
export function setup() {
  resizeGame();
  registerKeyListeners(env);

  window.addEventListener('resize', debounce(() => {
    resizeGame();
  }, 100));
}

export function start() {
  env.animationId = requestAnimationFrame(core);
}

export function stop() {
  cancelAnimationFrame(env.animationId);
}
