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

function getBounds(pos, size) {
  return [
    v.add2([], pos, [-(size.width/2.8 ), + (size.height * 0.9)]),
    v.add2([], pos, [size.width/2.8, + (size.height * 0.9)]),
    v.add2([], pos, [size.width/2.8, 0]),
    v.add2([], pos, [-(size.width/2.8), 0]),
  ];
}

export function gravity(element, env) {
  const { map, time } = env;
  const tiniestBitOfGravity = -G;
  const newPos = v.add([], element.pos, [0, tiniestBitOfGravity]);
  if (isCollidingWithWall(getBounds(newPos, element.size), map)) {
    element.speed[1] = 0;
    return;
  } else {
    element.speed = v.add2([], element.speed, [0, -G * time.deltaT]);
  }
}

function isCollidingWithWall(bounds, map) {
  const middleLeft = [bounds[0][0], (bounds[0][1] + bounds[3][1]) / 2];
  const middleRight = [bounds[1][0], (bounds[1][1] + bounds[2][1]) / 2];
  return !!bounds.concat([middleLeft, middleRight]).find(bound => map.isInWall(bound));
}

function goBackALittle(pos, motionVector) {
  const normalizedVector = v.normalize([], motionVector);
  const smallVector = [-normalizedVector[0], -normalizedVector[1]];
  return v.add2([], pos, smallVector);
}

export function move(pos, motionVector, size, getBoundsFromPos, env) {
  const { map } = env;

  let newPos = v.add([], pos, motionVector);

  let bounds = getBoundsFromPos(newPos, size);

  while (isCollidingWithWall(bounds, map)) {
    newPos = goBackALittle(newPos, motionVector);
    bounds = getBoundsFromPos(newPos, size);
  }

  return newPos;
}
