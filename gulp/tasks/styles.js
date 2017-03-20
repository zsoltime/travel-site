const gulp = require('gulp');
const postcss = require('gulp-postcss');
const autoprefixer = require('autoprefixer');
const cssVars = require('postcss-simple-vars');
const nested = require('postcss-nested');
const cssImport = require('postcss-import');
const mixins = require('postcss-mixins');

gulp.task('styles', () => {
  return gulp.src('./app/assets/styles/styles.css')
    .pipe(postcss([
      cssImport,
      mixins,
      cssVars,
      nested,
      autoprefixer,
    ]))
    .on('error', function(err) {
      console.error(err.toString());
      this.emit('end');
    })
    .pipe(gulp.dest('./app/temp/styles'));
});
