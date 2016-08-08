var gulp = require('gulp'),
    sass = require('gulp-sass'),
    jshint = require('gulp-jshint'),
    sourcemaps = require('gulp-sourcemaps'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    browserSync = require('browser-sync'),
    plumber = require('gulp-plumber'),
    filter = require('gulp-filter'),
    please = require('gulp-pleeease'),
    ngDocs = require('gulp-ngdocs'),
    ngAnnotate = require('gulp-ng-annotate'),
    addSrc = require('gulp-add-src'),
    del = require('del');

gulp.task('ngdocs', [], function () {
  var options = {
    html5Mode: true
  };
  return gulp.src('src/js/**')
    .pipe(ngDocs.process(options))
    .pipe(gulp.dest('./docs'));
});

gulp.task('styles', function () {
    gulp.src('src/sass/main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass({
            errLogToConsole: false,
            onError: function(err) {
                return notify().write(err);
            }
        }))
        .pipe(please())
        .pipe(sourcemaps.write('.'))
        .pipe(gulp.dest('dist/assets/css'))
        .pipe(filter('**/*.css'))
        .pipe(browserSync.reload({ stream:true }))
        .pipe(notify({ message: 'Styles task complete' }));
});

gulp.task('scripts', function() {
    return gulp.src('src/js/*.js')
      .pipe(addSrc(['src/js/services/*.js',
        'src/js/controllers/**.js',
        'src/js/factories/**.js',
        'src/js/directives/**.js'
      ]))
        .pipe(plumber())
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('default'))
        .pipe(concat('main.js'))
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(rename({suffix: '.min'}))
        .pipe(ngAnnotate())
        .pipe(uglify())
        .pipe(gulp.dest('dist/assets/js'))
        .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('three', function() {
  return gulp.src('src/js/*.js')
    .pipe(addSrc([
      'src/js/three/**.js'
    ]))
    .pipe(plumber())
    .pipe(jshint('.jshintrc'))
    .pipe(jshint.reporter('default'))
    .pipe(concat('three.js'))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(rename({suffix: '.min'}))
    .pipe(ngAnnotate())
    .pipe(uglify())
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(notify({ message: 'Scripts task complete' }));
});

gulp.task('vendor', function() {
  return gulp.src('bower_components/fastclick/lib/fastclick.js')
    .pipe(ngAnnotate())
    .pipe(addSrc([
      'bower_components/angular/angular.min.js',
      'bower_components/angular-ui-router/release/angular-ui-router.min.js',
      'bower_components/angular-busy/dist/angular-busy.min.js'
    ]))
    .pipe(plumber())
    .pipe(concat('vendor.js'))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(uglify())
    .pipe(rename({suffix: '.min'}))
    .pipe(gulp.dest('dist/assets/js'))
    .pipe(notify({ message: 'Vendor task complete' }));
});

gulp.task('images', function() {
    return gulp.src('src/img/*')
        .pipe(plumber())
        .pipe(cache(imagemin({ optimizationLevel: 5, progressive: true, interlaced: true })))
        .pipe(gulp.dest('dist/assets/img'))
        .pipe(notify({ message: 'Images task complete' }));
});


gulp.task('clean', function(cb) {
    del(['dist/assets/css', 'dist/assets/js', 'dist/assets/img'], cb)
});

gulp.task('default', function() {
    gulp.start('clean', 'styles', 'scripts', 'vendor', 'images');
});

gulp.task('browser-sync', function() {
    browserSync({
        server: {
            baseDir: "./"
        }
    });
});

gulp.task('watch',['browser-sync'], function() {

    // Watch .scss files
    gulp.watch('src/sass/*.scss', ['styles']);
    gulp.watch('src/sass/**/*.scss', ['styles']);

    // Watch .js files
    gulp.watch('src/js/*.js', ['scripts']);
  gulp.watch('src/js/three/*.js', ['three']);
  gulp.watch('src/js/factories/*.js', ['scripts']);
    gulp.watch('src/js/controllers/*.js', ['scripts']);
    gulp.watch('src/js/services/*.js', ['scripts']);
    gulp.watch('src/js/directives/*.js', ['scripts']);

    // Watch image files
    gulp.watch('src/img/*', ['images']);

    // Watch any files in dist/, reload on change
    gulp.watch(['dist/assets/js/*']).on('change', browserSync.reload);
    gulp.watch(['dist/assets/img/*']).on('change', browserSync.reload);
    gulp.watch(['*.html']).on('change', browserSync.reload);
    gulp.watch(['views/**/*.html']).on('change', browserSync.reload);
});