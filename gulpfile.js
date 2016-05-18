var gulp = require('gulp');
var babel = require('gulp-babel');
var nodemon = require('gulp-nodemon');
var browserify = require('browserify');
var source = require('vinyl-source-stream');
var sequence = require('run-sequence');
var path = require('path');
var merge = require('merge-stream');
var newer = require('gulp-newer');
var concat = require('gulp-concat');
var sass = require('gulp-sass');

gulp.task('sass', function () {

    var bundleConfigs = [{
        entries: [
            './src/sass/variables.scss',
            './src/sass/bootstrap.scss',
            './src/sass/font-awesome.scss',
            './src/sass/custom.scss',
            // './src/sass/media-queries-helpers.scss',
            './src/sass/media-queries.scss'
        ],
        dest: './dist/assets/css',
        outputName: 'main.min.css'
    }];

    return bundleConfigs.map(function (bundleConfig) {

        return gulp.src(bundleConfig.entries)
            .pipe(newer(path.join(bundleConfig.dest, bundleConfig.outputName)))
            .pipe(concat(bundleConfig.outputName))
            // .pipe(sass({outputStyle: 'compressed'}))
            .pipe(sass())
            .pipe(gulp.dest(bundleConfig.dest));
    });
});

gulp.task('media', function () {

    var html = gulp.src('./src/**/*.html')
            .pipe(gulp.dest(path.join('./dist')));

    var metas = gulp.src('./src/media/*')
        .pipe(gulp.dest(path.join('./dist/')));

    var fontAwewsome = gulp.src('./node_modules/font-awesome/fonts/**')
        .pipe(gulp.dest(path.join('./dist/assets', 'fonts', 'font-awesome', 'fonts')));

    var glyphicons = gulp.src('./node_modules/bootstrap-sass/assets/fonts/bootstrap/**')
        .pipe(gulp.dest(path.join('./dist/assets', 'fonts', 'bootstrap')));

    var img = gulp.src('./src/img/*')
            .pipe(gulp.dest(path.join('./dist/assets', 'img')));

    return merge(metas, fontAwewsome, glyphicons, img);
});

gulp.task('copy', function () {
  return gulp.src([
    'src/**/*.html',
    'node_modules/babel-polyfill/dist/polyfill.min.js'
    ])
    .pipe(gulp.dest('dist'));
});

gulp.task('compile', function () {
  return gulp.src('src/**/*.js')
    .pipe(babel({ presets: ['es2015'] })) 
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

gulp.task('build', function (callback) {
  sequence(['sass', 'media', 'compile', 'copy', 'bundle'], callback);
});

gulp.task('default', function (callback) {
  sequence(['sass', 'media', 'copy', 'compile', 'watch', 'bundle'], 'start', callback);
});
