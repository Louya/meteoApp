const {src, dest, series, watch, task} = require('gulp');

var gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const minify = require('gulp-minifier');
const clean = require('gulp-clean');
const imagemin = require('gulp-imagemin');
const mozjpeg = require('imagemin-mozjpeg');
const watchSass = require ('gulp-watch-sass');

var less = require('gulp-less');
var cleanCSS = require('gulp-clean-css');

gulp.task('lessCss', function() {
    return gulp.src('Assets/sass/*.scss')
                .pipe(less())
                .pipe(cleanCSS({compatibility: 'ie8'}))
                .pipe(gulp.dest('dist/css'));
 });

function cleanDir() {
    return src('dist', {read: false})
    .pipe(clean());
}

function compileSass() {
    return src('Assets/sass/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(dest('dist/css'))
}

function concatCss() {
    return src(['dist/css/*.css', '!dist/css/main.min.css'])
    .pipe(concat('main.min.css'))
    .pipe(dest('dist/css/'))
}


function concatJs() {
    return src('Assets/js/*.js')
    .pipe(concat('app.js'))
    .pipe(dest('dist/js/'))
}


function minifyJs() {
    return src('dist/js/**/*').pipe(minify({
        minify: true,
        minifyHTML: {
          collapseWhitespace: true,
          conservativeCollapse: true,
        },
        minifyJS: {
          sourceMap: true
        },
        minifyCSS: true,
        getKeptComment: function (content, filePath) {
            var m = content.match(/\/\*![\s\S]*?\*\//img);
            return m && m.join('\n') + '\n' || '';
        }
      })).pipe(dest('dist/js'));
}

function minifyCss() {
    return src('dist/css/**/*').pipe(minify({
        minify: true,
        minifyHTML: {
          collapseWhitespace: true,
          conservativeCollapse: true,
        },
        minifyJS: {
          sourceMap: true
        },
        minifyCSS: true,
        getKeptComment: function (content, filePath) {
            var m = content.match(/\/\*![\s\S]*?\*\//img);
            return m && m.join('\n') + '\n' || '';
        }
      })).pipe(dest('dist/css'));
}


function compressImg(){
    return src('Assets/img/*.{png,jpg,gif,svg,jpeg}')
    .pipe(imagemin([
        imagemin.gifsicle({interaced : true}),
        mozjpeg(),
        imagemin.optipng({optimizationLevel: 5}),
        imagemin.svgo({
            plugins: [
                {removeViewBox: true},
                {cleanupIDs: false}
            ]
        })
    ]))
    .pipe(dest('dist/img/'))
}


// gulp.task('watch:sass', function() {
//     gulp.watch('Assets/sass/*.scss', ['watchSass']);
// });

gulp.task('watch', function() {
    gulp.watch('Assets/sass/*.scss', gulp.series('lessCss'));
 });

exports.default = series(cleanDir, compileSass, concatCss, concatJs, minifyJs, minifyCss); 