cornerstone File Image Loader
=============================

A [cornerstone](https://github.com/cornerstonejs/cornerstone) Image Loader for images (JPG, PNG) using the HTML5 File API or  from ArrayBuffer.

Using the File API presents in HTML5 or ArrayBuffer data is possible open local image such as JPEG and PNG in Cornerstone library.

Live Examples
---------------

View the [Universal Dicom Viewer](https://webnamics.github.io/u-dicom-viewer/) built on cornerstone.

Install
-------

Via [NPM](https://www.npmjs.com/):

> npm install cornerstone-file-image-loader


Usage
-----

Simply include the cornerstoneFileImageLoader.js in your HTML file after you load cornerstone.js and then set the cornerstone instance as an external module for cornerstoneFileImageLoader:

````javascript
cornerstoneFileImageLoader.external.cornerstone = cornerstone;
````

This will let cornerstoneFileImageLoader register itself with cornerstone to load imageId's that have the imagefile schemes. 

To display an image, first add a HTML5 file object to cornerstoneFileImageLoader then pass the image as the imageId parameter to a cornerstone loadImage():

````javascript
const imageId = cornerstoneFileImageLoader.fileManager.add(file);
cornerstone.loadImage(imageId).then(function(image) {
	cornerstone.displayImage(element, image);
	...
}
````

Or if previously the data has loaded in a ArrayBuffer:

````javascript
const imageId = cornerstoneFileImageLoader.fileManager.addBuffer(data);
cornerstone.loadImage(imageId).then(function(image) {
	cornerstone.displayImage(element, image);
	...
}
````

Build System
============

This project uses webpack to build the software.

Pre-requisites:
---------------

NodeJs - [click to visit web site for installation instructions](http://nodejs.org).

Common Tasks
------------

Update dependencies (after each pull):
> npm install

Running the build:
> npm start

Automatically running the build and unit tests after each source change:
> npm run watch

Why is this a separate library from cornerstone?
================================================

Cornerstone was designed to support loading of any kind of image regardless of its container,
compression algorithm, encoding or transport.  This is one of many possible image loaders
that can provide the image pixel data to cornerstone to display

Copyright
=========
Copyright 2019 Luigi Orso [webnamics@gmail.com](mailto:webnamics@gmail.com)

