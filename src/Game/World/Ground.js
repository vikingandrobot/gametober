import { loadImage } from '../ImageLoader';

import GroundBaseUrl from '../../../assets/ground_base.png';
import GroundDetailsUrl from '../../../assets/ground_details.png';

const GroundBaseImage = loadImage(GroundBaseUrl);
const GroundDetailsImage = loadImage(GroundDetailsUrl);

class Ground {
  constructor(pos, size) {
    this.pos = pos || { x: 0, y: 0 };
    this.size = size || { width: 100, height: 100 };
  }

  logic() {
    // Don't really know what could happen here?
  }

  draw(env) {
    const { ctx } = env;
    const { pos, size } = this;
    const imageWidth = GroundBaseImage.width;
    let drawingPos = 0;
    while (drawingPos < size.width) {
      const xPos = pos.x + drawingPos;
      const yPos = ctx.canvas.height - pos.y - size.height - 10;
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
