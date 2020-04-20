/**
 * Convert array buffer to image. Returns a promise that resolves to an Image object for the bytes in arrayBuffer
 *
 * @param arrayBuffer - arrayBuffer with bytes for a web image (e.g. JPEG, PNG, etc)
 * @returns {Promise} Promise that resolves to an Image object
 */
export default function (image) {
  return new Promise((resolve, reject) => {
    image.onload = () => {
      resolve(image);
    };

    image.onerror = (error) => {
      reject(error);
    };
  });
}
