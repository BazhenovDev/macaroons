'use strict';

const less = require('gulp-less');
const gulp = require('gulp');
const cssmin = require('gulp-cssmin');
const rename = require('gulp-rename');

function defaultTask() {
    return gulp.src(["styles/*.less", "styles/*.css"])
        .pipe(less())
        .pipe(cssmin())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest("dist/gulp/styles"));
}

exports.default = defaultTask

exports.watch = function () {
    gulp.watch('./styles/*.less', gulp.series('default'));
};
