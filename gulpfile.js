'use strict';

const gulp = require('gulp');
const eslint = require('gulp-eslint');
const nodemon = require('gulp-nodemon');
const sequence = require('gulp-sequence');

const JS_PATHS = ['gulpfile.js', 'app.js', 'lib/**/*.js'];

function lint() {
  const lintConfigs = {
    extends: 'eslint:recommended',
    env: {
      node: true,
      es6: true,
      mocha: true,
    },
    rules: {
      'comma-dangle': ['error', 'always-multiline'],
      indent: ['error', 2, { SwitchCase: 1 }],
      'no-console': ['off'],
    },
  };

  return gulp.src(JS_PATHS)
    .pipe(eslint(lintConfigs))
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

function serve() {
  return nodemon({
    script: 'app.js',
    watch: JS_PATHS,
  });
}

gulp.task('lint', lint);
gulp.task('serve', serve);
gulp.task('start', sequence('lint', 'serve'));
