import { loadImage } from '../ImageLoader';

const TILE_SIZE = 70;
const TILE_SIZE_INSIDE_OF_IMAGE = 40;

class TileMap {
  constructor(settings) {
    const {
      spriteUrl, spriteWidthInTiles, cols, rows, tiles,
    } = settings;
    this.sprite = loadImage(spriteUrl);
    this.spriteWidthInTiles = spriteWidthInTiles;
    this.cols = cols;
    this.rows = rows;
    this.tiles = tiles;
  }

  getTileValue(row, col) {
    return this.tiles[row][col];
  }

  drawTile(ctx, posX, posY, row, col) {
    // The tile value which is also the index in the sprite
    const tileValue = this.getTileValue(row, col);
    if (tileValue == null) {
      return;
    }
    const spriteColIndex = tileValue % this.spriteWidthInTiles;
    const spriteRowIndex = parseInt(tileValue / this.spriteWidthInTiles);
    ctx.beginPath();
    ctx.drawImage(
      this.sprite,
      spriteColIndex * TILE_SIZE_INSIDE_OF_IMAGE,
      spriteRowIndex * TILE_SIZE_INSIDE_OF_IMAGE,
      TILE_SIZE_INSIDE_OF_IMAGE,
      TILE_SIZE_INSIDE_OF_IMAGE,
      posX,
      posY,
      TILE_SIZE,
      TILE_SIZE,
    );
    ctx.closePath();
  }
}

TileMap.TILE_SIZE = TILE_SIZE;

export default TileMap;
