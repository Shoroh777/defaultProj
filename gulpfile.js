const gulp = require('gulp'),
    rename = require('gulp-rename'),
    scss = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    sourcemaps = require('gulp-sourcemaps'),
    browserSync = require('browser-sync').create();

css_style = (done) => {

    gulp.src('devApp/scss/main.scss')
        .pipe(sourcemaps.init())
        .pipe(scss({
            errorLogToConsole: true,
            outputStyle: 'compressed'
        }))
        .on('error', console.error.bind(console))
        .pipe(autoprefixer({
            browsers: ['last 2 versions'],
            cascade: false
        }))
        .pipe(rename({suffix: '.min'}))
        .pipe(sourcemaps.write('./'))
        .pipe( gulp.dest('build/css/'))
        .pipe(browserSync.stream());

    done()
};

sync = (done) => {
    browserSync.init({
        server: {
            baseDir: 'build/'
        },
        port: 4550
    });

    done();
};

browserReload = (done) => {
    browserSync.reload();

    done();
};

watchFiles = () => {
    gulp.watch('devApp/scss/**/*', css_style);
    gulp.watch('devApp/**/*.html', browserReload);
    gulp.watch('devApp/**/*.js', browserReload);
};

gulp.task('default', gulp.parallel(watchFiles, sync, css_style));