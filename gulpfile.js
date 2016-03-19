var gulp = require('gulp');
var babel = require('gulp-babel');
var nodemon = require('gulp-nodemon');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var sequence = require('run-sequence');
var path = require('path');
var newer = require('gulp-newer');
var concat = require('gulp-concat');
var sass = require('gulp-sass');

gulp.task('sass', function () {

    var bundleConfigs = [{
        entries: [
            './src/sass/variables.scss',
            './src/sass/bootstrap.scss',
            './src/sass/font-awesome.scss',
            './src/sass/custom.scss'
        ],
        dest: './dist/styles',
        outputName: 'main.min.css'
    }];

    return bundleConfigs.map(function (bundleConfig) {

        return gulp.src(bundleConfig.entries)
            .pipe(newer(path.join(bundleConfig.dest, bundleConfig.outputName)))
            .pipe(concat(bundleConfig.outputName))
            .pipe(sass({outputStyle: 'compressed'}))
            .pipe(gulp.dest(bundleConfig.dest));
    });
});

gulp.task('copy', function () {
  return gulp.src([
    'src/**/*.html',
    'src/**/*.png'
    ])
    .pipe(gulp.dest('dist'));
});

gulp.task('compile', function () {
  return gulp.src('src/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});

gulp.task('watch', function () {
  gulp.watch('src/**/*.js', ['compile', 'bundle'])
  gulp.watch('src/**/*.html', ['copy']);
  gulp.watch('src/**/*.scss', ['sass']);
});

gulp.task('bundle', function () {
  var b = browserify({
    entries: 'src/index.js',
    debug: true,
    transform: ['babelify']
  });

  return b.bundle()
    .pipe(source('build/application.js'))
    .pipe(gulp.dest('dist'));
});

gulp.task('start', function () {
  nodemon({
    watch: 'dist',
    script: 'dist/index.js',
    ext: 'js',
    env: { 'NODE_ENV': 'development' }
  });
});

gulp.task('default', function (callback) {
  sequence(['sass', 'compile', 'watch', 'copy', 'bundle'], 'start', callback);
});
