/**
 * Convert array buffer to image. Returns a promise that resolves to an Image object for the bytes in arrayBuffer
 *
 * @param obj - is an object with a dataSet and a pixelData array
 * @returns {Promise} Promise that resolves to an Image object
 */
export default function (obj) {
  return new Promise((resolve, reject) => {
    let image = new Image();
	image.src = canvas.toDataURL("image/jpeg");
    image.onload = () => {
      resolve(image);
    };

    image.onerror = (error) => {
      reject(error);
    };
  });
}
