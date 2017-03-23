const gulp = require('gulp');
const modernizr = require('gulp-modernizr');

gulp.task('modernizr', () => {
  return gulp.src('./app/assets/**/*.{js,css}')
    .pipe(modernizr({
      options: [
        'setClasses',
      ],
    }))
    .pipe(gulp.dest('./app/temp/scripts/'));
});
