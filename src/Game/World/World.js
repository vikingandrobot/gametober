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
    v.add2([], pos, [-(size.width/2.8 ), + (size.height * 0.9)]),
    v.add2([], pos, [size.width/2.8, + (size.height * 0.9)]),
    v.add2([], pos, [size.width/2.8, 0]),
    v.add2([], pos, [-(size.width/2.8), 0]),
  ];
}

export function gravity(element, env) {
  const { time } = env;
  element.speed = v.add2([], element.speed, [0, -G * time.deltaT]);
}

function getCollidingPoints(bounds, map) {
  const bottomLeft = bounds[3];
  const bottomRight = bounds[2];
  return [bottomLeft, bottomRight].filter(b => map.isInWall(b));
  // const middleLeft = [bounds[0][0], (bounds[0][1] + bounds[3][1]) / 2];
  // const middleRight = [bounds[1][0], (bounds[1][1] + bounds[2][1]) / 2];
}

function getXYToCheck(speed, tileBounds) {
  const xSpeed = speed[0];
  const ySpeed = speed[1];
  let x;
  let y;
  if (xSpeed >= 0) {
    x = tileBounds[0][0];
  } else {
    x = tileBounds[1][0];
  }
  if (ySpeed >= 0) {
    y = tileBounds[3][1];
  } else {
    y = tileBounds[0][1];
  }
  return { x, y };
}

// Return a vector fixing the point position
function fixTrajectory(point, motionVector, map) {
  const invertedVector = [-motionVector[0], -motionVector[1]];
  const { y } = getXYToCheck(motionVector, map.getTileBounds(point));
  const yPos = y; // map.getTileBounds(point)[0][1];
  if (invertedVector[1] === 0) {
    return [0, 0];
  }
  const xPos = point[0] + invertedVector[0] * ((yPos - point[1]) / invertedVector[1]);
  return [xPos - point[0], yPos - point[1]]
}

export function move(pos, motionVector, size, getBoundsFromPos, env) {
  const { map } = env;

  let newPos = v.add([], pos, motionVector);
  let newSpeed = motionVector;

  let bounds = getBoundsFromPos(newPos, size);

  const collidingPoints = getCollidingPoints(bounds, map);
  if (collidingPoints.length) {
    const correctingVector = fixTrajectory(collidingPoints[0], motionVector, map);
    newPos = v.add([], newPos, correctingVector);
    if (correctingVector[0]) {
      newPos = v.add([], newPos, [-correctingVector[0], 0]);
    }
    if (correctingVector[1] !== 0) {
      newSpeed[1] = 0;
    }
  }

  return {
    pos: newPos,
    newSpeed,
  };
}
