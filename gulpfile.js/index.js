var gulp = require('gulp');
var path = require('path');

var config = require('./config');
var simpleCopyTask = require('./lib/simplyCopy');

require('./tasks/styles');

gulp.task('styles:assets', simpleCopyTask('css/**/!(*.css)'));

gulp.task('styles', gulp.series('styles:sass', 'styles:css', 'styles:assets'));
