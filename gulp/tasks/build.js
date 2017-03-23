const gulp = require('gulp');
const imagemin = require('gulp-imagemin');
const usemin = require('gulp-usemin');
const cleanCSS = require('gulp-clean-css');
const uglify = require('gulp-uglify');
const rev = require('gulp-rev');
const del = require('del');
const browserSync = require('browser-sync').create();

gulp.task('previewDist', () => {
    browserSync.init({
      notify: false,
      server: {
        baseDir: 'dist',
      },
    });
});

gulp.task('cleanDistFolder', ['icons'], () => {
  return del('./dist');
});

gulp.task('copyGeneralFiles', ['cleanDistFolder'], () => {
  return gulp.src([
    './app/**/*',
    '!./app/index.html',
    '!./app/assets/images/**',
    '!./app/assets/styles/**',
    '!./app/assets/scripts/**',
    '!./app/temp',
    '!./app/temp/**',
  ])
    .pipe(gulp.dest('./dist'));
});

gulp.task('optimizeImages', ['cleanDistFolder'], () => {
  return gulp.src([
    './app/assets/images/**/*',
    '!./app/assets/images/icons',
    '!./app/assets/images/icons/**/*',
  ])
    .pipe(imagemin({
      progressive: true,
      interlaced: true,
      multipass: true,
    }))
    .pipe(gulp.dest('./dist/assets/images'));
});

gulp.task('useminTrigger', ['cleanDistFolder'], () => {
  gulp.start('usemin');
});

gulp.task('usemin', ['styles', 'scripts'], () => {
  return gulp.src('./app/index.html')
    .pipe(usemin({
      css: [
        () => rev(),
        () => cleanCSS(),
      ],
      js: [
        () => rev(),
        () => uglify(),
      ],
    }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('build', [
  'cleanDistFolder',
  'copyGeneralFiles',
  'optimizeImages',
  'useminTrigger',
]);
