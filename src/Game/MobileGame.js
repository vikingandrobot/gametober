import * as Game from './Game';
import registerTouchListeners from './registerTouchListeners';


export function setup() {
  registerTouchListeners(Game.env);
  Game.setup();
}

export function start() {
  Game.start();
}

export function stop() {
  Game.stop();
}
