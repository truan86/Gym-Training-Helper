'use strict';

const gulp = require('gulp'),
    less = require('gulp-less'),
    cssnano = require('gulp-cssnano'),
    sourcemaps = require('gulp-sourcemaps'),
    browserify = require('browserify'),
    babel = require('gulp-babel'),
    babelify = require('babelify'),
    source = require('vinyl-source-stream'),
    ngAnnotate = require('gulp-ng-annotate'),
    stringify = require('stringify'),
    gutil = require('gutil'),
    buffer = require('vinyl-buffer');

gulp.task('default', ['build']);

gulp.task('build', ['scripts', 'html', 'styles']);

gulp.task('styles', () => {
    return gulp.src('app/styles/*.less')
        .pipe(sourcemaps.init())
        .pipe(less())
        .pipe(cssnano())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/styles'));
});

gulp.task('html', () => {
    return gulp.src('app/index.html')
        .pipe(gulp.dest('dist'));
});

gulp.task('scripts', () => {
    let b = browserify({
        entries: ['app/js/index.js'],
        cache: {},
        packageCache: {},
        debug: true
    });
    b.transform(babelify, {presets: ['es2015']});
    b.transform(stringify);
    b.on('error', gutil.log);
    b.on('time', gutil.log);
    return b.bundle()
        .pipe(source('index.js'))
        .pipe(buffer())
        .pipe(ngAnnotate())
        .pipe(gulp.dest('dist/js'));
});

