import { loadImage } from '../ImageLoader';

class Decor {
  constructor(pos, size, spriteUrl) {
    this.pos = pos;
    this.size = size;
    this.image = loadImage(spriteUrl);
  }

  draw(env) {
    const { camera: { ctx, canvas } } = env;
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

export default Decor;
