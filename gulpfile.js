var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var useref = require('gulp-useref');
var gulpIf = require('gulp-if');
var minifyCSS = require('gulp-minify-css');
var imagemin = require('gulp-imagemin');
var cache = require('gulp-cache');
var del = require('del');
var runSequence = require('run-sequence');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function(){
  return gulp.src('sass/style.sass')
    .pipe(sass())
    .pipe(autoprefixer({
            browsers: ['last 3 versions'],
            cascade: false
    }))
    .pipe(gulp.dest('css'))
    .pipe(browserSync.reload({
      stream: true
    }))
});

gulp.task('browserSync', function() {
  browserSync({
    server: {
      baseDir: ''
    },
  })
})

gulp.task('watch', ['browserSync', 'sass'], function(){
  gulp.watch('sass/**/*.sass', ['sass']);
  gulp.watch('*.html', browserSync.reload);
  gulp.watch('js/**/*.js', browserSync.reload);
})

gulp.task('style', function(){
  return gulp.src('css/*.css')
    .pipe(useref())
    .pipe(gulpIf('*.css', minifyCSS()))
    .pipe(gulp.dest('css'))
});

gulp.task('images', function(){
  return gulp.src('img/src/**/*.+(png|jpg|jpeg|gif|svg)')
    .pipe(cache(imagemin({
      interlaced: true
      })))
    .pipe(gulp.dest('img'))
});

gulp.task('default', function (callback) {
  runSequence(['sass','browserSync', 'watch'],
    callback
  )
})
