import arrayBufferToImage from './arrayBufferToImage.js';
import createImage from './createImage.js';
import fileManager from './fileManager.js';
import { loadImage, configure } from './loadImage.js';
import { external } from './externalModules.js';

const cornerstoneFileImageLoader = {
  arrayBufferToImage,
  createImage,
  loadImage,
  configure,
  external,
  fileManager
};

export {
  arrayBufferToImage,
  createImage,
  loadImage,
  configure,
  external,
  fileManager
};

export default cornerstoneFileImageLoader;
