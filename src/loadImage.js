import { external } from './externalModules.js';
import arrayBufferToImage from './arrayBufferToImage.js';
import imageToImage from './imageToImage.js';
import canvasToImage from './canvasToImage.js';
import dicomCanvasToImage from './dicomToImage.js';
import createImage from './createImage.js';
import createImageCustom from './createImageCustom.js';
import parseImageId from './parseImageId.js';
import fileManager from './fileManager.js';

//
// This is a Cornerstone image loader for images (PNG, JPG) using the HTML5 File API 
//

let options = {

};

// Loads an image from a HTML5 API file to an image
export function loadImage (imageId) {
  const parsedImageId = parseImageId(imageId);
  const fileIndex = parseInt(parsedImageId.url, 10);
  const file = fileManager.get(fileIndex);

  if (parsedImageId.scheme === 'imagefile') {

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

  } else if (parsedImageId.scheme === 'imagebuffer') {

    const promise = new Promise((resolve, reject) => {
      if (file !== null && file !== undefined) { // file is an ArrayBuffer
        const imageAsArrayBuffer = file;
        const imagePromise = arrayBufferToImage(imageAsArrayBuffer);
        imagePromise.then((image) => {
          const imageObject = createImage(image, imageId);
          resolve(imageObject);
        }, reject);
      } else {
        reject('buffer is null or undefined');
      }
    });

    return {
      promise
    };   
	
  } else if (parsedImageId.scheme === 'imageimage') {

    const promise = new Promise((resolve, reject) => {
      if (file !== null && file !== undefined) { // file is an image
        const imagePromise = imageToImage(file);
        imagePromise.then((image) => {
          const imageObject = createImage(image, imageId);
          resolve(imageObject);
        }, reject);
      } else {
        reject('image is null or undefined');
      }
    });

    return {
      promise
    };   
    
  } else if (parsedImageId.scheme === 'imagecanvas') {

    const promise = new Promise((resolve, reject) => {
      if (file !== null && file !== undefined) { // file is a canvas
        const imagePromise = canvasToImage(file);
        imagePromise.then((image) => {
          const imageObject = createImage(image, imageId);
          resolve(imageObject);
        }, reject);
      } else {
        reject('canvas is null or undefined');
      }
    });

    return {
      promise
    };   
    
  } else if (parsedImageId.scheme === 'imagecustom') {
    
    const start = new Date().getTime();
    const promise = new Promise((resolve, reject) => {
      const loadEnd = new Date().getTime();
      if (file !== null && file !== undefined) { // file is an custom object, with a cornerstone Image object and a pixelData array
        let imagePromise = createImageCustom(imageId, file);
        imagePromise.then(image => {
          const end = new Date().getTime();

          image.loadTimeInMS = loadEnd - start;
          image.totalTimeInMS = end - start;  
          
          resolve(image);
        }, reject);
      } else {
        reject('custom object is null or undefined');
      }
    });

    return {
      promise
    };   
    
  }
  
}

export function configure (opts) {
  options = opts;
}
