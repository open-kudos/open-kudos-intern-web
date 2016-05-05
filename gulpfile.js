/**
 * Created by vytautassugintas on 20/04/16.
 */

var Server = require('karma').Server;
var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();
var jshint = require('gulp-jshint');

gulp.task('watch', ['browserSync', 'sass'], function () {
    gulp.watch('src/app/**/*.scss', ['sass']);
    gulp.watch('')
    // Other watchers
});

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: 'src/'
        },
    })
});

gulp.task('jshint', function() {
    return gulp.src('src/app/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('jshint-stylish'));
});

gulp.task('sass', function () {
    return gulp.src('src/app/**/*.scss')
        .pipe(sass()) // Converts Sass to CSS with gulp-sass
        .pipe(gulp.dest('src/assets/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});