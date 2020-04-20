import { external } from './externalModules.js';

/**
 * creates a cornerstone Image object for the specified custom object
 *
 * @param imageId - the imageId for this image
 * @param customObj - a custom image object
 * @returns Cornerstone Image Object
 */
export default function (imageId, customObj) {
  // extract the attributes we need
  const rows = customObj.rows;
  const columns = customObj.columns;
   
  let image;
  
  // Extract the various attributes we need
  image = {
    imageId,
    minPixelValue: customObj.image.minPixelValue,
    maxPixelValue: customObj.image.maxPixelValue,
    slope: customObj.image.slope,
    intercept: customObj.image.intercept,
    windowCenter: customObj.image.windowCenter,
    windowWidth: customObj.image.windowWidth,
    rows,
    columns,
    height: rows,
    width: columns,
    color: customObj.image.color,
    rgba: customObj.image.rgba,
    columnPixelSpacing: customObj.image.columnPixelSpacing,
    rowPixelSpacing: customObj.image.rowPixelSpacing,
    invert: customObj.image.invert,
    sizeInBytes: rows * columns * 4
	};    
    
  image.getPixelData = () => customObj.pixelData;
  image.modalityLUT = customObj.image.modalityLUT;
  image.voiLUT = customObj.image.voiLUT;
  image.data = customObj.image.data;
  
  return new Promise((resolve, reject) => {
    resolve(image);
  });
}
