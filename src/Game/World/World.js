import * as v from '@thi.ng/vectors';

const G = 0.05;
export const everything = [];

/*
 * This will be a function to add any object to the world.
 * For now we will use it to store the platforms.
 */
export function spawn(element) {
  everything.push(element);
}

export function gravity(element, env) {
  const { time } = env;
  element.speed = v.add2([], element.speed, [0, -G * time.deltaT]);
}
