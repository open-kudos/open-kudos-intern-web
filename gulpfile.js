/**
 * Created by vytautassugintas on 20/04/16.
 */

var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var minify = require('gulp-minify-css');
var merge = require('merge-stream');
var browserSync = require('browser-sync').create();

gulp.task('serve', ['browserSync', 'sass'], function () {
    gulp.watch('src/app/**/*.scss', ['sass']);
    gulp.watch('src/app/**/*.html').on('change', browserSync.reload);
    gulp.watch('src/app/**/*.js').on('change', browserSync.reload);
    // Other watchers
});

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: 'src/'
        },
    })
});

gulp.task('sass', function () {
    var scssStream = gulp.src('src/app/**/*.scss')
        .pipe(sass())
        .pipe(concat('scss-files.scss'));

    var mergedStream = merge(scssStream)
        .pipe(concat('styles.css'))
        .pipe(minify())
        .pipe(gulp.dest('src/assets/css'));

    return mergedStream;
});