import { loadImage } from '../ImageLoader';

import PlayerUrl from '../../../assets/character.png';

const PlayerImage = loadImage(PlayerUrl);

class Player {

  pos = { x: 0, y: 0 };

  speed = { x: 0, y: 0 };

  size = { width: 85, height: 150 };

  logic(env) {
    const { controls: { left, right } } = env;
    if (left) {
      this.speed = { x: -8, y: 0 };
    }
    if (right) {
      this.speed = { x: 8, y: 0 };
    }
    if (!left && ! right) {
      this.speed = { x: 0, y: 0 };
    }

    this.pos.x += this.speed.x;
    this.pos.y += this.speed.y;
  }

  draw(env) {
    const { ctx } = env;
    const { pos, size } = this;
    ctx.beginPath();
    const xPos = pos.x - (size.width / 2);
    const yPos = ctx.canvas.height - pos.y - size.height;
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
