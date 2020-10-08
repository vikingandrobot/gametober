import TileMap from '../World/TileMap';
import { MAP_WIDTH_IN_TILES } from '../World/Map';

const MIN_POS_X = 0;
const MAX_POS_X = TileMap.TILE_SIZE * MAP_WIDTH_IN_TILES;

const Z_REFERENCE_DISTANCE = 200;

class Camera {
  constructor(canvasId) {
    this.canvas = document.getElementById(canvasId);
    this.ctx = this.canvas.getContext('2d');
    this.pos = [this.canvas.width / 2, this.canvas.height / 2];
  }

  resizeViewport() {
    const vw = Math.max(document.documentElement.clientWidth || 0, window.innerWidth || 0);
    const vh = Math.max(document.documentElement.clientHeight || 0, window.innerHeight || 0)

    this.canvas.width = vw;
    this.canvas.height = vh;
  }

  getViewport() {
    return { width: this.canvas.width, height: this.canvas.height };
  }

  getDepthRatio(zPos) {
    return Z_REFERENCE_DISTANCE / zPos;
  }

  setZPos(zPos) {
    this.ctx.save();
    const ratio = this.getDepthRatio(zPos);
    this.ctx.translate(0, -(ratio * this.canvas.height - this.canvas.height));
    this.ctx.scale(ratio, ratio);
  }

  center(newPos) {
    const { ctx, canvas } = this;
    ctx.save();
    // Center the position in the middle of the canvas, except if it would mean showing outside the limits of the World
    const xTranslation = Math.min(Math.max(-MAX_POS_X + canvas.width, -newPos[0] + canvas.width/2), MIN_POS_X);
    // The below commented line will be useful once we start following the character vertically as well
    ctx.translate(xTranslation, newPos[1] - 100);
    //ctx.translate(xTranslation, 0);
    this.pos = newPos;
  }

  reset() {
    this.ctx.restore();
  }
}

export default Camera;
