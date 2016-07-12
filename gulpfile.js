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

gulp.task('jsIntoOne', function() {
    var controllers = gulp.src('src/app/**/*.controller.js');
    merge(controllers)
        .pipe(concat('controllers.js'))
        .pipe(gulp.dest('src/app/dist'));

    var services = gulp.src([
        'src/app/**/*.service.js',
        'src/app/services/*.js'
    ]);
    merge(services)
        .pipe(concat('services.js'))
        .pipe(gulp.dest('src/app/dist'));

    var component = gulp.src('src/app/**/*.component.js');
    merge(component)
        .pipe(concat('components.js'))
        .pipe(gulp.dest('src/app/dist'));

    var directive = gulp.src('src/app/**/*.directive.js');
    merge(directive)
        .pipe(concat('directives.js'))
        .pipe(gulp.dest('src/app/dist'));

    var serviceResult = uglify.minify('src/app/dist/controllers.js', {
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
    fs.writeFileSync('src/app/dist/1.0.1.controllers.min.js', serviceResult.code);

    var serviceResult = uglify.minify('src/app/dist/services.js', {
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
    fs.writeFileSync('src/app/dist/1.0.1.services.min.js', serviceResult.code);

    var serviceResult = uglify.minify('src/app/dist/components.js', {
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
    fs.writeFileSync('src/app/dist/1.0.1.components.min.js', serviceResult.code);

    var serviceResult = uglify.minify('src/app/dist/directives.js', {
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
    fs.writeFileSync('src/app/dist/1.0.1.directives.min.js', serviceResult.code);
});