import { loadImage } from '../ImageLoader';

class Decor {
  constructor(pos, size, spriteUrl) {
    this.pos = pos;
    this.size = size;
    this.image = loadImage(spriteUrl);
  }

  getBounds() {
    return [
      [this.pos[0], this.pos[1] + this.size.height],
      [this.pos[0] + this.size.width, this.pos[1] + this.size.height],
      [this.pos[0] + this.size.width, this.pos[1]],
      [this.pos[0], this.pos[1]],
    ];
  }

  draw(env) {
    const { camera } = env;
    const { ctx, canvas } = camera;
    if (camera.isElementVisible(this.getBounds())) {
      ctx.beginPath();
      ctx.drawImage(
        this.image,
        this.pos[0],
        canvas.height - this.pos[1] - this.size.height,
        this.size.width,
        this.size.height,
      );
      ctx.closePath();
    }
  }
}

export default Decor;
