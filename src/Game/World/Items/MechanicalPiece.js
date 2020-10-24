import { getBounds } from '../World';

import Item, { ItemTypes } from './Item';
import Animation from '../../Player/Animation';

import spriteUrl from '../../../../assets/screw.png';

class MechanicalPiece extends Item {

  constructor(pos, size = { width: 60, height: 45 }) {
    super(pos, size);
    this.animation = new Animation(spriteUrl, {
      numberOfFrames: 1,
      frameRate: 1,
    });
  }

  getType() {
    return ItemTypes.MechanicalPiece;
  }

  draw(env) {
    const { camera } = env;
    const { ctx } = camera;
    const { pos, size } = this;

    if (camera.isElementVisible(getBounds(pos, size))) {

      const xPos = pos[0] - (size.width / 2);
      const yPos = ctx.canvas.height - pos[1] - size.height;
      this.animation.draw(ctx, xPos, yPos, this.size);
    }
  }
}

export default MechanicalPiece;
