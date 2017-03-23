const gulp = require('gulp');
const rename = require('gulp-rename');
const svgSprite = require('gulp-svg-sprite');
const del = require('del');
const svg2png = require('gulp-svg2png');

const config = {
  shape: {
    spacing: {
      padding: 1,
    },
  },
  mode: {
    css: {
      variables: {
        replaceSVGwithPNG: () => (
          (sprite, render) => render(sprite).split('.svg').join('.png')
        ),
      },
      sprite: 'sprite.svg',
      render: {
        css: {
          template: './gulp/templates/sprite.css',
        },
      },
    },
  },
};

gulp.task('beginClean', () => {
  return del([
    './app/temp/sprite',
    './app/assets/images/sprites',
  ]);
});

gulp.task('createSprite', ['beginClean'], () => {
  return gulp.src('./app/assets/images/icons/**/*.svg')
    .pipe(svgSprite(config))
    .pipe(gulp.dest('./app/temp/sprite/'));
});

gulp.task('createPNGCopy', ['createSprite'], () => {
  return gulp.src('./app/temp/sprite/css/*.svg')
    .pipe(svg2png())
    .pipe(gulp.dest('./app/temp/sprite/css'));
});

gulp.task('copySpriteImage', ['createPNGCopy'], () => {
  return gulp.src('./app/temp/sprite/css/**/*.{svg,png}')
    .pipe(gulp.dest('./app/assets/images/sprites'));
});

gulp.task('copySpriteCSS', ['createSprite'], () => {
  return gulp.src('./app/temp/sprite/css/*.css')
    .pipe(rename('_sprite.css'))
    .pipe(gulp.dest('./app/assets/styles/modules'));
});

gulp.task('endClean', ['copySpriteImage', 'copySpriteCSS'], () => {
  return del('./app/temp/sprite');
});

gulp.task('icons', [
  'beginClean',
  'createSprite',
  'createPNGCopy',
  'copySpriteImage',
  'copySpriteCSS',
  'endClean',
]);
