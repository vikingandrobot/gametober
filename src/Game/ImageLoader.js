/**
 * Temporary way of loading images to make sure to start the game after
 * the last asset has been loaded.
 */

let nbOfLoadingImages = 0;
let resolve = null;

// Load an image
export function loadImage(imageUrl) {
  const image = new Image();
  nbOfLoadingImages += 1;
  image.onload = () => {
    nbOfLoadingImages -= 1;
    if (resolve && nbOfLoadingImages === 0) {
      resolve();
    }
  }
  image.src = imageUrl;

  return image;
}

// Function to call to wait for all the currently loading images to finish loading
export function waitForImagesToBeLoaded() {
  return new Promise((r) => {
    if (nbOfLoadingImages === 0) {
      resolve();
    } else {
      resolve = r;
    }
  });
}
