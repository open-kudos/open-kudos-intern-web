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
            'app/*.controller.js',
            'app/*.config.js',
            'app/*.utils.js',
            'app/kudos-feed/kudos-feed.controller.js',
            'app/components/**/*.component.js',
            'app/components/**/*.directive.js',
            'app/components/**/*.service.js',
            'app/services/*.js',
            'app/login/*.js',
            'app/registration/*.js',
            'app/profile/*.js',
            'app/acorns/*.js',
            'app/notifications/*.js',
            'app/leaderboard/*.js',
            'test/*.spec.js',
            'app/components/**/*.spec.js'
        ],

        autoWatch: true,

        frameworks: ['jasmine'],

        browsers: ['Chrome'],

        plugins: [
            'karma-chrome-launcher',
            'karma-firefox-launcher',
            'karma-jasmine',
            'karma-junit-reporter'
        ],

        junitReporter: {
            outputFile: 'test_out/unit.xml',
            suite: 'unit'
        },

        customLaunchers: {
            Chrome_travis_ci: {
                base: 'Chrome',
                flags: ['--no-sandbox']
            }
        }

    };

    if (process.env.TRAVIS) {
        configuration.browsers = ['Chrome_travis_ci'];
    }

    config.set(configuration);
};
