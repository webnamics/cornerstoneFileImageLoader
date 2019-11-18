import { external } from './externalModules.js';
import arrayBufferToImage from './arrayBufferToImage.js';
import createImage from './createImage.js';
import parseImageId from './parseImageId.js';
import fileManager from './fileManager.js';

//
// This is a Cornerstone image loader for images (PNG, JPG) using the HTML5 File API 
//

let options = {

};

// Loads an image given a url to an image
export function loadImage (imageId) {
  const cornerstone = external.cornerstone;
  const parsedImageId = parseImageId(imageId);
  const fileIndex = parseInt(parsedImageId.url, 10);
  const file = fileManager.get(fileIndex);

  const promise = new Promise((resolve, reject) => {
    const fileReader = new FileReader();

    fileReader.onload = (e) => {
      const imageAsArrayBuffer = e.target.result;
	  const imagePromise = arrayBufferToImage(imageAsArrayBuffer);
	  imagePromise.then((image) => {
        const imageObject = createImage(image, imageId);
        resolve(imageObject);
      }, reject);
    };

    fileReader.onerror = reject;

    fileReader.readAsArrayBuffer(file);
  });

  return {
	promise
  };
}

export function configure (opts) {
  options = opts;
}
