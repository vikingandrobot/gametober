import { loadImage } from '../ImageLoader';

class Animation {
  constructor(path, options) {
    this.numberOfFrames = options.numberOfFrames;
    this.frameRate = options.frameRate;
    this.currentSprite = 0;
    this.currentFrame = 0;
    this.sprite = loadImage(path);
  }

  draw(ctx, xPos, yPos, size) {
    ctx.beginPath();
    ctx.drawImage(
      this.sprite,
      (this.sprite.width / this.numberOfFrames) * this.currentSprite,
      0,
      this.sprite.width / this.numberOfFrames,
      this.sprite.height,
      xPos,
      yPos,
      size.width,
      size.height,
    );
    ctx.closePath();

    if (this.currentFrame === this.frameRate) {
      this.currentFrame = 0;
      this.currentSprite = (this.currentSprite + 1) % this.numberOfFrames;
    } else {
      this.currentFrame += 1;
    }
  }
}

export default Animation;
