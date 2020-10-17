import { getBounds, isColliding, collect } from './World';

const MAX_DELTA_Y = 50;

const V_L_GREEN = '#baffde';
const L_GREEN = '#80ffbf';
const GREEN = '#4deb9b';
const D_GREEN = '#2ba668';
const V_D_GREEN = '#1c7849';

class Gem {

  constructor(pos) {
    this.pos = pos;
    this.originalPos = pos.slice();
  }

  size = {
    width: 40,
    height: 50,
  };

  direction = 1;

  isCollected = false;

  logic(env) {
    const { player } = env;

    const gemBounds = getBounds(this.pos, this.size);
    const playerBounds = getBounds(player.pos, player.size);

    if (isColliding(gemBounds, playerBounds)) {
      collect(this);
    }

    this.pos[1] = Math.max(
      this.originalPos[1],
      Math.min(this.pos[1] + this.direction, this.originalPos[1] + MAX_DELTA_Y)
    );

    if (this.pos[1] === this.originalPos[1] + MAX_DELTA_Y) {
      this.direction = -1;
    } else if (this.pos[1] === this.originalPos[1]) {
      this.direction = 1;
    }
  }

  draw(env) {
    const { camera: { ctx } } = env;
    const { size } = this;


    const topMiddle = [this.pos[0], this.pos[1] + size.height];
    const bottomMiddle = [this.pos[0], this.pos[1]];
    const leftMiddle = [this.pos[0] - size.width/2, this.pos[1] + size.height / 2];
    const rightMiddle = [this.pos[0] + size.width/2, this.pos[1] + size.height / 2];
    const lmiddle = [this.pos[0] - size.width / 6, this.pos[1] + size.height / 2];
    const rmiddle = [this.pos[0] + size.width / 6, this.pos[1] + size.height / 2];

    ctx.fillStyle = V_L_GREEN;
    ctx.beginPath();
    ctx.moveTo(topMiddle[0], ctx.canvas.height - topMiddle[1]);
    ctx.lineTo(lmiddle[0], ctx.canvas.height - lmiddle[1]);
    ctx.lineTo(leftMiddle[0], ctx.canvas.height - leftMiddle[1]);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = L_GREEN;
    ctx.beginPath();
    ctx.moveTo(topMiddle[0], ctx.canvas.height - topMiddle[1]);
    ctx.lineTo(lmiddle[0], ctx.canvas.height - lmiddle[1]);
    ctx.lineTo(rmiddle[0], ctx.canvas.height - rmiddle[1]);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = GREEN;
    ctx.beginPath();
    ctx.moveTo(topMiddle[0], ctx.canvas.height - topMiddle[1]);
    ctx.lineTo(rmiddle[0], ctx.canvas.height - rmiddle[1]);
    ctx.lineTo(rightMiddle[0], ctx.canvas.height - rightMiddle[1]);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = GREEN;
    ctx.beginPath();
    ctx.moveTo(bottomMiddle[0], ctx.canvas.height - bottomMiddle[1]);
    ctx.lineTo(lmiddle[0], ctx.canvas.height - lmiddle[1]);
    ctx.lineTo(leftMiddle[0], ctx.canvas.height - leftMiddle[1]);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = D_GREEN;
    ctx.beginPath();
    ctx.moveTo(bottomMiddle[0], ctx.canvas.height - bottomMiddle[1]);
    ctx.lineTo(lmiddle[0], ctx.canvas.height - lmiddle[1]);
    ctx.lineTo(rmiddle[0], ctx.canvas.height - rmiddle[1]);
    ctx.closePath();
    ctx.fill();

    ctx.fillStyle = V_D_GREEN;
    ctx.beginPath();
    ctx.moveTo(bottomMiddle[0], ctx.canvas.height - bottomMiddle[1]);
    ctx.lineTo(rmiddle[0], ctx.canvas.height - rmiddle[1]);
    ctx.lineTo(rightMiddle[0], ctx.canvas.height - rightMiddle[1]);
    ctx.closePath();
    ctx.fill();

  }
}

export default Gem;
