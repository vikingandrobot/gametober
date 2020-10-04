import * as v from '@thi.ng/vectors';

import { loadImage } from '../ImageLoader';

import PlayerUrl from '../../../assets/character.png';

const PlayerImage = loadImage(PlayerUrl);

class Player {

  constructor(pos = [0, 0], speed = [0, 0]) {
    this.pos = pos;
    this.speed = speed;
  }

  size = { width: 70, height: 120 };

  canJump = true;

  getBounds() {
    return [
      v.add2([], this.pos, [-(this.size.width/2.8 ), + (this.size.height * 0.9)]),
      v.add2([], this.pos, [this.size.width/2.8, + (this.size.height * 0.9)]),
      v.add2([], this.pos, [this.size.width/2.8, 0]),
      v.add2([], this.pos, [-(this.size.width/2.8), 0]),
    ];
  }

  logic(env) {
    const { controls: { left, right, up }, time, map } = env;
    if (left) {
      this.speed = [-0.5 * time.deltaT, this.speed[1]];
    }
    if (right) {
      this.speed = [0.5  * time.deltaT, this.speed[1]];
    }
    if (up && this.canJump) {
      this.speed = [this.speed[0], 15];
      this.canJump = false;
    }
    if (!left && ! right) {
      this.speed = [0, this.speed[1]];
    }

    this.pos = v.add2([], this.pos, [this.speed[0], 0]);
    this.pos[0] = Math.min(Math.max(this.pos[0], this.size.width/2.8), map.getWidth());

    const bounds = this.getBounds();

    if (this.speed[0] > 0) {
      let upperBoundary = Number.MAX_SAFE_INTEGER;
      let lowerBoundary = Number.MAX_SAFE_INTEGER;

      if (map.tileMap.tiles[parseInt(bounds[1][1] / map.tileSize)][parseInt(bounds[1][0] / map.tileSize)] !== null) {
        upperBoundary = parseInt(bounds[1][0] / map.tileSize) * map.tileSize;
      }

      if (map.tileMap.tiles[parseInt(bounds[2][1] / map.tileSize)][parseInt(bounds[2][0] / map.tileSize)] !== null) {
        lowerBoundary = parseInt(bounds[2][0] / map.tileSize) * map.tileSize;
      }
      const horizontalBoundary = Math.min(upperBoundary, lowerBoundary);
      if (horizontalBoundary < bounds[1][0] || horizontalBoundary < bounds[2][0]) {
        this.pos = [horizontalBoundary - this.size.width/2.8 - 1, this.pos[1]];
      }
    } else if (this.speed[0] < 0) {
      let upperBoundary = Number.MIN_SAFE_INTEGER;
      let lowerBoundary = Number.MIN_SAFE_INTEGER;

      if (map.tileMap.tiles[parseInt(bounds[0][1] / map.tileSize)][parseInt(bounds[0][0] / map.tileSize)] !== null) {
        upperBoundary = parseInt(bounds[0][0] / map.tileSize) * map.tileSize + map.tileSize;
      }

      if (map.tileMap.tiles[parseInt(bounds[3][1] / map.tileSize)][parseInt(bounds[3][0] / map.tileSize)] !== null) {
        lowerBoundary = parseInt(bounds[3][0] / map.tileSize) * map.tileSize + map.tileSize;
      }
      const horizontalBoundary = Math.max(upperBoundary, lowerBoundary);
      if (horizontalBoundary > bounds[0][0] || horizontalBoundary > bounds[3][0]) {
        this.pos = [horizontalBoundary + this.size.width/2.8 + 1, this.pos[1]];
      }
    }


    const newBounds = this.getBounds();

    this.pos = v.add2([], this.pos, [0, this.speed[1]]);

    let leftYIndex = 0;
    let rightYIndex = 0;
    map.tileMap.tiles.find((row) => {
      let touched = false;
      if (row[parseInt(newBounds[3][0] / map.tileSize)] !== null) {
        leftYIndex += 1;
        touched = true;
      }
      if (row[parseInt(newBounds[2][0] / map.tileSize)] !== null) {
        rightYIndex += 1;
        touched = true;
      }
      return !touched;
    });

    const yLimit = Math.max(leftYIndex, rightYIndex) * map.tileSize;

    if (yLimit > this.pos[1]) {
      this.pos[1] = Math.max(this.pos[1], yLimit);
    }
    if (this.pos[1] === yLimit) {
      this.speed = [this.speed[1], 0];
      this.canJump = true;
    }
  }

  draw(env) {
    const { camera: { ctx } } = env;
    const { pos, size } = this;
    const xPos = pos[0] - (size.width / 2);
    const yPos = ctx.canvas.height - pos[1] - size.height;
    // const bounds = this.getBounds();
    // ctx.beginPath();
    // ctx.strokeStyle = "green";
    // ctx.moveTo(bounds[0][0], ctx.canvas.height - bounds[0][1]);
    // ctx.lineTo(bounds[1][0], ctx.canvas.height - bounds[1][1]);
    // ctx.lineTo(bounds[2][0], ctx.canvas.height - bounds[2][1]);
    // ctx.lineTo(bounds[3][0], ctx.canvas.height - bounds[3][1]);
    // ctx.closePath();
    // ctx.stroke();
    ctx.beginPath();
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
