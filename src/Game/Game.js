import debounce from 'lodash.debounce';

import registerKeyListeners from './registerKeyListeners';

import Camera from './Camera/Camera';
import { gravity } from './World/World';
import Decor from './World/Decor';
import Player from './Player/Player';
import Map from './World/Map';

import treeUrl from '../../assets/wood_first_layer.png';
import treeUrlInverted from '../../assets/wood_first_layer_inverted.png';
import stoneUrl from '../../assets/stone_first_layer.png';
import stoneUrlInverted from '../../assets/stone_first_layer_inverted.png';
import mountainsUrl from '../../assets/mountains.png';


const player = new Player([200, 400]);

const camera = new Camera('gt-canvas');

const decorsFirstLayer = [
  new Decor(
    [100, 20],
    { width: 433, height: 300 },
    treeUrl,
  ),
  new Decor(
    [-100, 100],
    { width: 300, height: 220 },
    stoneUrlInverted,
  ),
  new Decor(
    [300, 50],
    { width: 433, height: 300 },
    treeUrlInverted,
  ),
  new Decor(
    [600, 100],
    { width: 300, height: 220 },
    stoneUrl,
  ),
  new Decor(
    [800, 50],
    { width: 433, height: 300 },
    treeUrl,
  ),
  new Decor(
    [1100, 20],
    { width: 433, height: 300 },
    treeUrl,
  ),
  new Decor(
    [900, 100],
    { width: 300, height: 220 },
    stoneUrlInverted,
  ),
  new Decor(
    [1300, 50],
    { width: 433, height: 300 },
    treeUrlInverted,
  ),
  new Decor(
    [1600, 100],
    { width: 300, height: 220 },
    stoneUrl,
  ),
  new Decor(
    [1800, 50],
    { width: 433, height: 300 },
    treeUrl,
  ),
  new Decor(
    [2000, 100],
    { width: 300, height: 220 },
    stoneUrl,
  ),
  new Decor(
    [2200, 50],
    { width: 350, height: 220 },
    treeUrl,
  ),
  new Decor(
    [2800, 50],
    { width: 433, height: 300 },
    treeUrl,
  ),
  new Decor(
    [2600, 50],
    { width: 433, height: 300 },
    stoneUrl,
  ),
];

const mountains = new Decor(
  [0, 200],
  { width: 15000, height: 3300 },
  mountainsUrl,
);

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


  camera.setZPos(1000);
  camera.center(player.pos);
  mountains.draw(env);
  camera.reset();
  camera.reset();
  camera.center(player.pos);
  env.map.draw(env);
  player.draw(env);
  camera.reset();
  camera.setZPos(150);
  camera.center(player.pos);
  decorsFirstLayer.forEach(d => d.draw(env));
  camera.reset();
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
