import TileMap from '../World/TileMap';
import { MAP_WIDTH_IN_TILES, MAP_HEIGHT_IN_TILES } from '../World/Map';

const MIN_POS_X = 0;
const MAX_POS_X = TileMap.TILE_SIZE * MAP_WIDTH_IN_TILES;
const MIN_POS_Y = 0;
const MAX_POS_Y = TileMap.TILE_SIZE * MAP_HEIGHT_IN_TILES;

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

  getVisibleBounds() {
    const x0 = this.pos[0] - this.canvas.width / 2;
    const x1 = this.pos[0] + this.canvas.width / 2;
    const y1 = this.pos[1] + this.canvas.height;
    const y0 = this.pos[1];

    return [
      [x0, y1],
      [x1, y1],
      [x1, y0],
      [x0, y0],
    ];
  }

  isElementVisible(bounds) {
    const x0 = bounds[0][0];
    const x1 = bounds[1][0];
    const y0 = bounds[3][1];
    const y1 = bounds[0][1];
    const cb = this.getVisibleBounds();

    return (x0 <= cb[1][0] && x1 >= cb[0][0] && y0 <= cb[0][1] && y1 >= cb[3][1]);
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
    const mapNewPos = [
      Math.max(Math.min(MAX_POS_X - canvas.width/2 - TileMap.TILE_SIZE, newPos[0]), MIN_POS_X + canvas.width/2 + TileMap.TILE_SIZE),
      Math.max(Math.min(MAX_POS_Y - canvas.height - TileMap.TILE_SIZE, newPos[1] - 100), MIN_POS_Y + TileMap.TILE_SIZE),
    ]
    // The below commented line will be useful once we start following the character vertically as well
    ctx.translate(-mapNewPos[0] + canvas.width/2, mapNewPos[1]);
    //ctx.translate(xTranslation, 0);
    this.pos = mapNewPos;
  }

  reset() {
    this.ctx.restore();
  }
}

export default Camera;
