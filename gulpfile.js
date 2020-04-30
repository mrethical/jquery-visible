const gulp = require('gulp');
const { series, watch } = require('gulp');
const del = require('del');
const browserify = require('browserify');
const source = require('vinyl-source-stream');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');



gulp.task('clean', () => {
  return del(['dist/*'])
});

const build = () => {
  return browserify('./src/dist.js')
    .transform('babelify', {
      presets: ['env'],
    })
    .bundle()
    .pipe(source('jquery.visible.js'))
    .pipe(gulp.dest('dist'));
};
const buildUgly = () => {
  return gulp.src('./dist/jquery.visible.js')
    .pipe(concat('jquery.visible.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest('dist'));
};
const watcher = () => {
  watch('./src/*', build);
};

gulp.task('watch', series(build, watcher));
gulp.task('build', build);
gulp.task('build-all', series(build, buildUgly));

exports.default = build;
