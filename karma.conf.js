module.exports = function (config) {
    var configuration = {
        basePath: 'src',

        files: [
            'app/bower_components/angular/angular.js',
            'app/bower_components/angular-mocks/angular-mocks.js',
            'app/bower_components/angular-route/angular-route.js',
            "app/bower_components/angular-cookies/angular-cookies.min.js",
            "app/bower_components/angular-local-storage/dist/angular-local-storage.min.js",
            "app/bower_components/angular-base64/angular-base64.js",
            "app/bower_components/angular-translate/angular-translate.min.js",
            "app/bower_components/angular-translate-loader-url/angular-translate-loader-url.min.js",
            "app/bower_components/angular-translate-loader-static-files/angular-translate-loader-static-files.min.js",
            "app/bower_components/angular-translate-storage-cookie/angular-translate-storage-cookie.min.js",
            "app/bower_components/angular-messages/angular-messages.min.js",
            "app/bower_components/angular-sanitize/angular-sanitize.min.js",
            "app/bower_components/toastr/toastr.min.js",
            'app/*.module.js',
            'app/!(bower_components)/**/*.component.js',
            'app/!(bower_components)/**/*.controller.js',
            'app/!(bower_components)/**/*.directive.js',
            'app/!(bower_components)/**/*.service.js',
            'app/!(bower_components)/**/*.js',
            '../test/**/*.spec.js'
        ],

        autoWatch: true,

        preprocessors: {'app/!(bower_components)/**/*.js': 'coverage'},
        reporters: ['spec', 'coverage'],

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        customLaunchers: {
            Chrome_travis_ci: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        },

        coverageReporter: {
            type: "lcov"
        }

    };

    if (process.env.TRAVIS) {
        configuration.browsers = ['Chrome_travis_ci'];
    }

    config.set(configuration);
};
