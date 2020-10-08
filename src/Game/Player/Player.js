import * as v from '@thi.ng/vectors';

import { move, getBounds } from '../World/World';
import { loadImage } from '../ImageLoader';
import MotionStatus from './MotionStatus';

import PlayerUrlRight from '../../../assets/character_right.png';
import PlayerUrlLeft from '../../../assets/character_Left.png';

const PlayerImageRight = loadImage(PlayerUrlRight);
const PlayerImageLeft = loadImage(PlayerUrlLeft);

class Player {

  constructor(pos = [0, 0], speed = [0, 0]) {
    this.pos = pos;
    this.speed = speed;
    this.prevSpeed = null;
  }

  size = { width: 65, height: 110 };

  canJump = true;

  inTheAir = false;

  direction = 1;

  motionStatus = MotionStatus.STOP;

  maxSpeed = 10;
  maxVerticalSpeed = 20;

  getBounds() {
    return getBounds(this.pos, this.size);
  }

  logic(env) {
    const { controls: { left, right, up }, time } = env;
    const speedModified = this.inTheAir ? 0.05 : 0.1;

    if (left) {
      this.speed = v.add2([], this.speed, [-speedModified * time.deltaT, 0]);
      this.speed[0] = Math.max(-this.maxSpeed, this.speed[0]);
      this.direction = -1;
    }
    if (right) {
      this.speed = v.add2([], this.speed, [speedModified  * time.deltaT, 0]);
      this.speed[0] = Math.min(this.maxSpeed, this.speed[0]);
      this.direction = 1;
    }
    if (up && this.canJump) {
      this.speed = [this.speed[0], Math.abs(this.speed[0])/2 + 15];
      this.canJump = false;
    }
    if (!left && ! right) {
      const desc = 0.05 * time.deltaT;
      if (Math.abs(this.speed[0]) < desc) {
        this.speed[0] = 0;
      } else {
        this.speed = v.add2([], this.speed, [-this.direction * desc, 0]);
      }
    }

    if (this.speed[0] < 0) {
      this.speed[0] = Math.max(this.speed[0], -this.maxSpeed);
    } else {
      this.speed[0] = Math.min(this.speed[0], this.maxSpeed);
    }
    if (this.speed[1] < 0) {
      this.speed[1] = Math.max(this.speed[1], -this.maxVerticalSpeed);
    } else {
      this.speed[1] = Math.min(this.speed[1], this.maxVerticalSpeed);
    }

    const newPos = move(this.pos, this.speed, this.size, getBounds, env);
    if (this.pos[0] === newPos[0]) {
      this.speed[0] = 0;
    }
    if (this.pos[1] === newPos[1]) {
      this.speed[1] = 0;
    }
    this.pos = newPos;

    if (this.prevSpeed && this.prevSpeed[1] === this.speed[1] && this.speed[1] === 0) {
      this.canJump = true;
      this.inTheAir = false;
    } else if (this.prevSpeed){
      this.inTheAir = true;
    }
    this.prevSpeed = this.speed;
  }

  draw(env) {
    const { camera: { ctx } } = env;
    const { pos, size } = this;
    const xPos = pos[0] - (size.width / 2);
    const yPos = ctx.canvas.height - pos[1] - size.height;
    const bounds = this.getBounds();
    ctx.beginPath();
    ctx.strokeStyle = "green";
    ctx.moveTo(bounds[0][0], ctx.canvas.height - bounds[0][1]);
    ctx.lineTo(bounds[1][0], ctx.canvas.height - bounds[1][1]);
    ctx.lineTo(bounds[2][0], ctx.canvas.height - bounds[2][1]);
    ctx.lineTo(bounds[3][0], ctx.canvas.height - bounds[3][1]);
    ctx.closePath();
    ctx.stroke();

    ctx.beginPath();
    ctx.drawImage(
      this.direction > 0 ? PlayerImageRight : PlayerImageLeft,
      xPos,
      yPos,
      size.width,
      size.height,
    );
    ctx.closePath();
  }
}

export default Player;
