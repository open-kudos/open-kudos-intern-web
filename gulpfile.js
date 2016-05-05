/**
 * Created by vytautassugintas on 20/04/16.
 */

var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync').create();

gulp.task('watch', ['browserSync', 'sass'], function () {
    gulp.watch('app/**/*.scss', ['sass']);
    // Other watchers
});

gulp.task('browserSync', function () {
    browserSync.init({
        server: {
            baseDir: 'src/'
        }
    })
});

gulp.task('sass', function () {
    return gulp.src('src/app/**/*.scss')
        .pipe(sass()) // Converts Sass to CSS with gulp-sass
        .pipe(gulp.dest('src/assets/css'))
        .pipe(browserSync.reload({
            stream: true
        }))
});