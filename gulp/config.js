'use strict';

var gulp = require('gulp');
var gulpNgConfig = require('gulp-ng-config');
var fs = require('fs');

var ENV = process.env.APP_ENV || 'development';

if (ENV === 'development') {
  require('dotenv').load();
}

var $ = require('gulp-load-plugins')();

module.exports = function (options) {

  var config = require('../config.js');

  gulp.task('config', function () {
    fs.writeFileSync('./config.json',
                     JSON.stringify(config[ENV]));
    gulp.src('./config.json')
      .pipe(gulpNgConfig('Metanome.config', {
      }))
      .pipe(gulp.dest(options.src + '/app/scripts/'))
  });

};


