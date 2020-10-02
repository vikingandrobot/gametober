export const everything = [];

/*
 * This will be a function to add any object to the world.
 * For now we will use it to store the platforms.
 */
export function spawn(element) {
  everything.push(element);
}
