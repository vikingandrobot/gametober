import { loadImage } from '../ImageLoader';

import GroundBaseUrl from '../../../assets/ground_base.png';
import GroundDetailsUrl from '../../../assets/ground_details.png';

const GroundBaseImage = loadImage(GroundBaseUrl);
const GroundDetailsImage = loadImage(GroundDetailsUrl);

class Ground {
  constructor(pos = [0, 0], size = { width: 100, height: 100 }) {
    this.pos = pos;
    this.size = size;
  }

  logic() {
    // Don't really know what could happen here?
  }

  draw(env) {
    const { camera: { ctx } } = env;
    const { pos, size } = this;
    const imageWidth = GroundBaseImage.width;
    let drawingPos = 0;
    while (drawingPos < size.width) {
      const xPos = pos[0] + drawingPos;
      const yPos = ctx.canvas.height - pos[1] - size.height - 10;
      ctx.beginPath();
      ctx.drawImage(
        GroundBaseImage,
        xPos,
        yPos,
        imageWidth,
        size.height + 10,
      );
      ctx.drawImage(
        GroundDetailsImage,
        xPos,
        yPos - 20,
        imageWidth,
        GroundDetailsImage.height,
      );
      drawingPos += imageWidth;
    }
    ctx.closePath();
  }
}

export default Ground;
