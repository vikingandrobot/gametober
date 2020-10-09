import * as Game from './Game';
import registerKeyListeners from './registerKeyListeners';


export function setup() {
  registerKeyListeners(Game.env);
  Game.setup();
}

export function start() {
  Game.start();
}

export function stop() {
  Game.stop();
}
