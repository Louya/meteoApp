const {src, dest, series, watch, task} = require('gulp');

var gulp = require('gulp');
const sass = require('gulp-sass');
const concat = require('gulp-concat');
const minify = require('gulp-minifier');
const clean = require('gulp-clean');
const imagemin = require('gulp-imagemin');
const mozjpeg = require('imagemin-mozjpeg');
const watchSass = require ('gulp-watch-sass');


gulp.task('cleanDir', function () {
    return gulp.src('dist', {read: false})
    .pipe(clean());
})

gulp.task('compileSass',function () {
    return gulp.src('Assets/sass/*.scss')
    .pipe(sass.sync().on('error', sass.logError))
    .pipe(gulp.dest('dist/css'))
})

gulp.task('concatCss', function () {
    return gulp.src(['dist/css/*.css', '!dist/css/main.min.css'])
    .pipe(concat('main.min.css'))
    .pipe(dest('dist/css/'))
})

gulp.task('concatJs', function () {
    return gulp.src('Assets/js/*.js')
    .pipe(concat('app.js'))
    .pipe(gulp.dest('dist/js/'))
})

gulp.task('minifyJs', function () {
    return gulp.src('dist/js/**/*').pipe(minify({
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
      })).pipe(gulp.dest('dist/js'));
})

gulp.task('minifyCss', function () {
    return gulp.src('dist/css/**/*').pipe(minify({
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
      })).pipe(gulp.dest('dist/css'));
})

gulp.task('compressImg', function (){
    return gulp.src('Assets/img/*.{png,jpg,gif,svg,jpeg}')
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
    .pipe(gulp.dest('dist/img/'))
})


gulp.task('watch', function() {
    gulp.watch('Assets/sass/*.scss', gulp.series('compileSass'));
});

// exports.default = series(concatCss); 
gulp.task('default', gulp.series('cleanDir','compileSass','concatCss','concatJs','minifyJs','minifyCss'));