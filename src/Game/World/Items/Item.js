import { move } from '../World';

export const ItemTypes = {
  Item: Symbol('Item'),
  MechanicalPiece: Symbol('MechanicalPiece'),
};

class Item {
  constructor(pos, size) {
    this.pos = pos;
    this.size = size;
    this.speed = [0, 0];
  }

  maxVerticalSpeed = 20;

  logic(env) {

    if (this.speed[0] !== 0) {
      if (Math.abs(this.speed[0]) < 0.5) {
        this.speed[0] = 0;
      } else {
        this.speed[0] = this.speed[0]/1.05;
      }
    }

    // This needs to be exported somewhere to be used the same everywhere
    if (this.speed[1] < 0) {
      this.speed[1] = Math.max(this.speed[1], -this.maxVerticalSpeed);
    } else {
      this.speed[1] = Math.min(this.speed[1], this.maxVerticalSpeed);
    }

    // Do nothing
    const newPos = move(this.pos, this.speed, this.size, env);
    this.pos = newPos;
  }

  draw() {
    // Do nothing
  }

  getType() {
    return ItemTypes.Item;
  }
}

export default Item;
