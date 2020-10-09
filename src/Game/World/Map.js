import TileMap from './TileMap';

import mapImageUrl from '../../../assets/ground_tile_map.png';
import tiles from './map.json';

export const MAP_WIDTH_IN_TILES = 50;
export const MAP_HEIGHT_IN_TILES = 20;

const mapOptions = {
  cols: MAP_WIDTH_IN_TILES,
  rows: MAP_HEIGHT_IN_TILES,
  spriteUrl: mapImageUrl,
  spriteWidthInTiles: 2,
  tiles: tiles.map(row => row.map(val => val -1)),
  logicalMap: tiles.map(row => row.map((val) => { return val === 0 ? 0 : 1 })),
};

class Map {

  tileMap = new TileMap(mapOptions);

  tileSize = TileMap.TILE_SIZE;

  getWidth () {
   return MAP_WIDTH_IN_TILES * TileMap.TILE_SIZE;
  }

  /* Given a position vector, returns the row index and col index of the
   * corresponding tile.
   */
  getTileIndexesFromPos(pos) {
    return {
      row: parseInt(pos[1] / this.tileSize),
      col: parseInt(pos[0] / this.tileSize),
    };
  }

  /* Given a row index and a col index in the tile map, return the position of the bounds
   * of the corresponding tile.
   */
  getTileBoundsFromIndex(rowIndex, colIndex) {
    const rowPos = rowIndex * this.tileSize;
    const colPos = colIndex * this.tileSize;

    return [
      [colPos, rowPos + this.tileSize],
      [colPos + this.tileSize, rowPos + this.tileSize],
      [colPos + this.tileSize, rowPos],
      [colPos, rowPos],
    ];
  }

  /* Given a position vector, returns the bounds of the corresponding tile
   */
  getTileBoundsFromPos(pos) {
    const { row, col } = this.getTileIndexesFromPos(pos);
    return this.getTileBoundsFromIndex(row, col);
  }


  /*
   * Given some bounds, return the indexes of all tiles that are colliding with
   * those bounds.
   */
  getCollidingTilesIndexesFromBounds(bounds) {
    // Indexes of the for corner of the bounds
    const boundsIndexes = bounds.map(b => this.getTileIndexesFromPos(b));

    let allTiles = [];

    for (let r = boundsIndexes[3].row; r <= boundsIndexes[0].row; r += 1) {
      for (let c = boundsIndexes[3].col; c <= boundsIndexes[2].col; c += 1) {
        allTiles.push({ row: r, col: c });
      }
    }
    return allTiles
      .filter(t => this.tileMap.logicalMap[t.row][t.col] === 1);
  }

  /*
   * Return the bounds of the tiles that collide with the given bounds.
   */
  getCollidingTilesBoundsFromBounds(bounds) {
    return this.getCollidingTilesIndexesFromBounds(bounds)
      .map(({ row, col }) => this.getTileBoundsFromIndex(row, col));
  }

  draw(env) {
    const { camera } = env;
    const viewport = camera.getViewport();
    const cameraBounds = camera.getVisibleBounds();
    const indexOrigin = this.getTileIndexesFromPos(cameraBounds[3]);
    const indexEnd = this.getTileIndexesFromPos(cameraBounds[1]);
    const endRow = Math.min(MAP_HEIGHT_IN_TILES, indexEnd.row + 1);
    const endCol = Math.min(MAP_WIDTH_IN_TILES, indexEnd.col + 1);
    for (let row = indexOrigin.row; row < endRow; ++row) {
      const rowYPos = viewport.height - TileMap.TILE_SIZE - (row * TileMap.TILE_SIZE);
      for (let col = indexOrigin.col; col < endCol; ++col) {
        const colXPos = col * TileMap.TILE_SIZE;
        this.tileMap.drawTile(camera.ctx, colXPos, rowYPos, row, col);
      }
    }
  }
}

export default Map;
