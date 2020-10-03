import * as v from '@thi.ng/vectors';

import { loadImage } from '../ImageLoader';

import PlayerUrl from '../../../assets/character.png';

const PlayerImage = loadImage(PlayerUrl);

class Player {

  constructor(pos = [0, 0], speed = [0, 0]) {
    this.pos = pos;
    this.speed = speed;
  }

  size = { width: 85, height: 150 };

  canJump = true;

  logic(env) {
    const { controls: { left, right, up }, time, } = env;
    if (left) {
      this.speed = [-0.5 * time.deltaT, this.speed[1]];
    }
    if (right) {
      this.speed = [0.5  * time.deltaT, this.speed[1]];
    }
    if (up && this.canJump) {
      this.speed = [this.speed[0], 15];
      this.canJump = false;
    }
    if (!left && ! right) {
      this.speed = [0, this.speed[1]];
    }

    this.pos = v.add2([], this.pos, this.speed);
    this.pos[1] = Math.max(this.pos[1], 100);
    if (this.pos[1] === 100) {
      this.canJump = true;
    }
  }

  draw(env) {
    const { camera: { ctx } } = env;
    const { pos, size } = this;
    ctx.beginPath();
    const xPos = pos[0] - (size.width / 2);
    const yPos = ctx.canvas.height - pos[1] - size.height;
    ctx.drawImage(
      PlayerImage,
      xPos,
      yPos,
      size.width,
      size.height,
    );
    ctx.closePath();
  }
}

export default Player;
