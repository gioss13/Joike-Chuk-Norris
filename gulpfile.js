const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();


var SRC = 'src/';
var DIST = 'dist/';

// SASS
gulp.task('sass', function(){
    gulp.src(SRC+'scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest(DIST+'css'))
        // inject css changes (not full page reload)
        .pipe(browserSync.stream())
});

gulp.task('sass:watch', function () {
    gulp.watch('./sass/**/*.scss', ['sass']);
});


/* minify css */
gulp.task('css:min', ['clean'], function() {
    return gulp.src(SRC+'scss/*.scss')
        //.pipe(changed('css',{extension: '.css'}))
        .pipe(sass({outputStyle: 'compressed'}))
        .pipe(gulp.dest(DIST+'css'))
});

/* minify js */
gulp.task('js:min', ['clean'], function () {
    return gulp.src([SRC+'scripts/*.js'])
        .pipe(concat('main.min.js'))
        .pipe(uglify())
        .pipe(gulp.dest(DIST+'scripts'))
});

// Static server
gulp.task('browser-sync', function() {
    browserSync.init({
        server: {
            baseDir: "./"
        },
        files : ["./" + DIST + "js/**/*.js", "./" + DIST + "**/*.html", "./" + DIST + "css/**/*.css" ]
    });
});