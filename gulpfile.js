var gulp = require('gulp');
var inject = require('gulp-inject');
var uglify = require('uglify-js');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var minify = require('gulp-minify-css');
var merge = require('merge-stream');
var browserSync = require('browser-sync').create();
var mkdirp = require('mkdirp');
var wait = require('gulp-wait');
var fs = require('fs');
var del = require('del');
var packageOptions = require('./package.json');

gulp.task('serve', ['browserSync', 'sass', 'minify-files'], function () {
    gulp.watch('src/app/**/*.scss', ['sass']);
    gulp.watch('src/app/**/*.js', ['minify-files']);
    gulp.watch('src/app/**/*.html').on('change', browserSync.reload);
    gulp.watch('src/app/**/*.js').on('change', browserSync.reload);
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

gulp.task('clean', function () {
    del(['src/temp']);
    del(['src/dist']);
});

gulp.task('merge-files', ['clean'], function (callback) {
    mergeFiles('src/app/**/*.controller.js', 'src/temp', 'kudos-controller.js');
    mergeFiles('src/app/**/*.service.js', 'src/temp', 'kudos-service.js');
    mergeFiles('src/app/services/*.js', 'src/temp', 'kudos-http-service.js');
    mergeFiles('src/app/**/*.component.js', 'src/temp', 'kudos-component.js');
    mergeFiles('src/app/**/*.directive.js', 'src/temp', 'kudos-directive.js');
    setTimeout(function () {
        mergeFiles('src/temp/*.js', 'src/temp', 'bundle.js');
        callback();
    }, 1000);
});

gulp.task('minify-files', ['merge-files'], function (callback) {
    minifyAndSave('src/temp/kudos-controller.js', 'src/dist', 'src/dist/kudos-controllers.min.js');
    minifyAndSave('src/temp/kudos-service.js', 'src/dist', 'src/dist/kudos-service.min.js');
    minifyAndSave('src/temp/kudos-http-service.js', 'src/dist', 'src/dist/kudos-HTTP-service.min.js');
    minifyAndSave('src/temp/kudos-component.js', 'src/dist', 'src/dist/kudos-component.min.js');
    minifyAndSave('src/temp/kudos-directive.js', 'src/dist', 'src/dist/kudos-directive.min.js');
    setTimeout(function () {
        minifyAndSave('src/temp/bundle.js', 'src/dist', 'src/dist/bundle.min.'+packageOptions.version+'.js');
        callback();
    }, 500);
});

gulp.task('build-local', function (callback) {
    buildServerFile(packageOptions.localAPI);
    callback();
});

gulp.task('build-prod', ['update-version'], function (callback) {
    buildServerFile(packageOptions.prodAPI);
    callback();
});

gulp.task('build-test', ['update-version'], function (callback) {
    buildServerFile(packageOptions.testAPI);
    callback();
});

gulp.task('update-version', function (callback) {
    var pkg = getPackageJson();
    var version = pkg.version.split(".");
    pkg.version = version[0] + "." + version[1] + "." + (Number(pkg.version.split(".")[2]) + 1);
    fs.writeFileSync('./package.json', JSON.stringify(pkg, null, 2));
    callback();
});

gulp.task('update-index', function () {
    gulp.src('./src/index.html')
        .pipe(inject(gulp.src('./src/dist/bundle.min.'+packageOptions.version+'.js'), { ignorePath: 'src/', addRootSlash: false }))
        .pipe(gulp.dest('./src'));
});

function buildServerFile(url) {
    var serverConstant = '(function() {"use strict";angular.module("myApp").constant("SERVER", {"ip": "' + url + '"})})();';
    fs.writeFileSync('src/app/services/server.js', serverConstant);
}

function getPackageJson () {
    return JSON.parse(fs.readFileSync('./package.json', 'utf8'));
}

function mergeFiles(filesToMerge, finalDist, fileName) {
    var files = gulp.src(filesToMerge);
    return merge(files)
        .pipe(concat(fileName))
        .pipe(gulp.dest(finalDist));
}

function minifyAndSave(src, finalFolder, finalDist) {
    var concatedFile = uglify.minify(src, {
        mangle: true,
        compress: {
            sequences: true,
            dead_code: true,
            conditionals: true,
            booleans: true,
            unused: true,
            if_return: true,
            join_vars: true,
            drop_console: false
        }
    });

    mkdirp.sync(finalFolder);

    fs.writeFileSync(finalDist, concatedFile.code);
}