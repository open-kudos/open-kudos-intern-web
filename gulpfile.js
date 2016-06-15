/**
 * Created by vytautassugintas on 20/04/16.
 */
var gulp = require('gulp');
var uglify = require('uglify-js');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var minify = require('gulp-minify-css');
var merge = require('merge-stream');
var browserSync = require('browser-sync').create();
var fs = require('fs');

gulp.task('serve', ['browserSync', 'sass'], function () {
    gulp.watch('src/app/**/*.scss', ['sass']);
    gulp.watch('src/app/**/*.js', ['minifyJs']);
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

gulp.task('minifyJs', function() {
    var controllers = gulp.src('src/app/**/*.controller.js')
        .pipe(concat('controllers.js'));

    var mergedControllers = merge(controllers)
        .pipe(concat('controllers.js'))
        .pipe(gulp.dest('src/assets/js'));

    var controllerResult = uglify.minify('src/assets/js/controllers.js', {
        mangle: true,
        compress: {
            sequences: true,
            dead_code: true,
            conditionals: true,
            booleans: true,
            unused: true,
            if_return: true,
            join_vars: true,
            drop_console: true
        }
    });

    //return mergedControllers;
    fs.writeFileSync('src/assets/js/controllers.min.js', controllerResult.code);

    var services = gulp.src('src/app/**/*.service.js')
        .pipe(concat('services.js'));

    var mergedServices = merge(services)
        .pipe(concat('services.js'))
        .pipe(gulp.dest('src/assets/js'));

    var serviceResult = uglify.minify('src/assets/js/services.js', {
        mangle: true,
        compress: {
            sequences: true,
            dead_code: true,
            conditionals: true,
            booleans: true,
            unused: true,
            if_return: true,
            join_vars: true,
            drop_console: true
        }
    });

    //return mergedControllers;
    fs.writeFileSync('src/assets/js/services.min.js', serviceResult.code);

    var component = gulp.src('src/app/**/*.component.js')
        .pipe(concat('components.js'));

    var mergedComponents = merge(component)
        .pipe(concat('components.js'))
        .pipe(gulp.dest('src/assets/js'));

    var componentResult = uglify.minify('src/assets/js/components.js', {
        mangle: true,
        compress: {
            sequences: true,
            dead_code: true,
            conditionals: true,
            booleans: true,
            unused: true,
            if_return: true,
            join_vars: true,
            drop_console: true
        }
    });

    //return mergedControllers;
    fs.writeFileSync('src/assets/js/components.min.js', serviceResult.code);
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