import * as v from '@thi.ng/vectors';

const G = 0.055;
export const everything = [];

/*
 * This will be a function to add any object to the world.
 * For now we will use it to store the platforms.
 */
export function spawn(element) {
  everything.push(element);
}

export function getBounds(pos, size) {
  return [
    v.add2([], pos, [-(size.width/2 ), + (size.height)]),
    v.add2([], pos, [size.width/2, + (size.height)]),
    v.add2([], pos, [size.width/2, 0]),
    v.add2([], pos, [-(size.width/2), 0]),
  ];
}

/*
 * Return the bounds of the cross rectangle (overlapping rectangle) between
 * 2 bounds describing 2 rectangles.
 */
export function getCrossRectangleBounds(bounds1, bounds2) {
  const x1 = Math.max(bounds1[0][0], bounds2[0][0]);
  const x2 = Math.min(bounds1[1][0], bounds2[1][0]);
  const y1 = Math.max(bounds1[3][1], bounds2[3][1]);
  const y2 = Math.min(bounds1[0][1], bounds2[0][1]);
  return [
    [x1, y2],
    [x2, y2],
    [x2, y1],
    [x1, y1],
  ];
}

export function gravity(element, env) {
  const { time } = env;
  element.speed = v.add2([], element.speed, [0, -G * time.deltaT]);
}

/*
 * Algorithm to move a cross rectangle outside of a tile.
 * tile: Bounds of a tile
 * cr: Bounds of the cross rectangle to move
 */
function computeVectorToMoveObjectOutOfTile(tile, cr) {
  const crWidth = cr[1][0] - cr[0][0];
  const crHeight = cr[0][1] - cr[3][1];

  let vx = 0;
  let vy = 0;

  if (crWidth < crHeight) {
    const distanceLeft = cr[1][0] - tile[0][0];
    const distanceRight = tile[1][0] - cr[0][0];
    if (distanceLeft < distanceRight) {
      vx = -distanceLeft - 1;
    } else {
      vx = distanceRight;
    }
  } else {
    const distanceBottom = cr[0][1] - tile[3][1];
    const distanceTop = tile[0][1] - cr[3][1];
    if (distanceBottom < distanceTop) {
      vy = -distanceBottom - 1;
    } else {
      vy = distanceTop;
    }
  }
  return [vx, vy];
}

/*
 * Move an element inside the map.
 * pos: Position vector of the element ot move
 * motionVector: The vector describing the movement, for example, the speed
 * size: the size of the element (width, height)
 * getBoundsFromPos: A function that returns the bounds of the element from the pos
 * env: current environment of the game
 */
export function move(pos, motionVector, size, getBoundsFromPos, env) {
  const { map } = env;

  let newPos = v.add2([], pos, motionVector);

  let bounds = getBoundsFromPos(newPos, size);
  let collisionTiles = map.getCollidingTilesBoundsFromBounds(bounds);
  let sortedTiles = collisionTiles
    .map((t) => {
      const c = getCrossRectangleBounds(bounds, t);
      const area = (c[1][0] - c[0][0]) * (c[0][1]-c[3][1]);
      return {
        tile: t,
        collisionRectangle: c,
        area,
      };
    })
    .sort((t1, t2) => t2.area - t1.area);

  for (let i = 0; i < sortedTiles.length; ++i) {
    const { tile, collisionRectangle } = sortedTiles[i];
    const correctionVector = computeVectorToMoveObjectOutOfTile(tile, collisionRectangle);
    newPos = v.add2([], newPos, correctionVector);

    bounds = getBoundsFromPos(newPos, size);
    collisionTiles = map.getCollidingTilesBoundsFromBounds(bounds);

    if (collisionTiles.length === 0) {
      break;
    } else {
      // Filter out tiles that are already 
      sortedTiles = sortedTiles.filter(t1 => collisionTiles.find(t2 => (
        t1.tile[0][0] === t2[0][0] && t1.tile[0][1] === t2[0][1] &&
        t1.tile[1][0] === t2[1][0] && t1.tile[1][1] === t2[1][1] &&
        t1.tile[2][0] === t2[2][0] && t1.tile[2][1] === t2[2][1] &&
        t1.tile[3][0] === t2[3][0] && t1.tile[3][1] === t2[3][1]
      )));
      i = -1;
    }
  }

  return newPos;
}
