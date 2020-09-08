'use strict';

const { paths: { vendor, source, destination } } = require('../paths');
const { src, dest } = require('gulp');

const copy = () => {
  src(vendor.styles)
    .pipe(dest(`${destination.styles}libs/`));
  return src(`${source.root}favicon.ico`)
    .pipe(dest(destination.root));
};

module.exports = copy;
