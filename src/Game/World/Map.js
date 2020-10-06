import TileMap from './TileMap';

import mapImageUrl from '../../../assets/ground_tile_map.png';
import tiles from './map.json';

const MAP_WIDTH_IN_TILES = 50;
const MAP_HEIGHT_IN_TILES = 20;

const mapOptions = {
  cols: MAP_WIDTH_IN_TILES,
  rows: MAP_HEIGHT_IN_TILES,
  spriteUrl: mapImageUrl,
  spriteWidthInTiles: 2,
  tiles: tiles,
};

class Map {

  tileMap = new TileMap(mapOptions);

  tileSize = TileMap.TILE_SIZE;

  getWidth () {
   return MAP_WIDTH_IN_TILES * TileMap.TILE_SIZE;
  }

  isInWall(pos) {
    const x = pos[0];
    const y = pos[1];

    return this.tileMap.tiles[parseInt(y / this.tileSize)][parseInt(x / this.tileSize)] !== null;
  }

  getTileBounds(pos) {
    const x = pos[0];
    const y = pos[1];
    const bottomLeft = [
      parseInt(x / this.tileSize) * this.tileSize,
      parseInt(y / this.tileSize) * this.tileSize,
    ];

    return [
      [bottomLeft[0], bottomLeft[1] + this.tileSize],
      [bottomLeft[0] + this.tileSize, bottomLeft[1] + this.tileSize],
      [bottomLeft[0] + this.tileSize, bottomLeft[1]],
      bottomLeft,
    ];
  }

  draw(env) {
    const { camera } = env;
    const viewport = camera.getViewport();
    for (let row = 0; row < MAP_HEIGHT_IN_TILES; ++row) {
      const rowYPos = viewport.height - TileMap.TILE_SIZE - (row * TileMap.TILE_SIZE);
      for (let col = 0; col < MAP_WIDTH_IN_TILES; ++col) {
        const colXPos = col * TileMap.TILE_SIZE;
        this.tileMap.drawTile(camera.ctx, colXPos, rowYPos, row, col);
      }
    }
  }
}

export default Map;
