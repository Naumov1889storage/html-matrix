var gulp = require("gulp");
		stylus = require('gulp-stylus'),
		pug = require('gulp-pug'),
		concatCSS = require('gulp-concat-css'),
		minifyCSS = require('gulp-minify-css'),
		uglify = require('gulp-uglify'),
		concatJS = require('gulp-concat'),
		prefix = require('gulp-autoprefixer'),
		uncss = require('gulp-uncss'),
		browserSync = require('browser-sync'),
		imagemin = require('gulp-tinypng-nokey'),
		del = require('del'),
		notify = require('gulp-notify'),
		plumber = require('gulp-plumber');



/*
gulp.task("mytask", function () {
	return gulp.src("source-files")        /!*берем какой-то файл*!/
		.pipe(plugin())                           /!*делаем что-то с ним*!/
		.pipe(gulp.dest("folder"))           /!*выгружаем его куда-то*!/
})
*/

/*del*/
gulp.task('clean', function () {
	return del.sync('dist');
});

/*fonts*/
gulp.task('fontsdest', function () {
	gulp.src('src/fonts/*')
		.pipe(gulp.dest('dist/fonts'))
});

/*css*/
gulp.task('uncss', function () {
	return gulp.src('dist/css/**/*.css')
		.pipe(uncss({html: ('dist/**/*.html')}))
		.pipe(gulp.dest('dist/css'))
});

gulp.task('stylus', function () {
	return gulp.src('src/styl/**/*.styl')
		.pipe(plumber({
			errorHandler: notify.onError(function (err) {
				return {
					title: 'stylus',
					message: err.message
				};
			})
		}))
		.pipe(stylus())
		.pipe(gulp.dest('src/trash/css'))
		.pipe(concatCSS('concat-css.min.css'))
		.pipe(prefix('last 15 versions', '> 1%', 'ie 9'))
		.pipe(minifyCSS())
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('libs-css', function () {
	gulp.src('src/libs/**/*.css')
		.pipe(concatCSS('concat-css-libs.min.css'))
		.pipe(prefix('last 15 versions', '> 1%', 'ie 9'))
		.pipe(minifyCSS())
		.pipe(gulp.dest('dist/css'))
		.pipe(browserSync.reload({stream: true}))
});

/*js*/
gulp.task('libs-js', function () {
	gulp.src(['!src/libs/js/jquery-3.2.1.min.js', 'src/libs/**/*.js'])
		.pipe(concatJS('concat-js-libs.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'))
		.pipe(browserSync.reload({stream: true}))
});


gulp.task('jquery-libs', function () {
	gulp.src('src/libs/js/jquery-3.2.1.min.js')
		.pipe(gulp.dest('dist/js'))
});

gulp.task('common-min-js', function () {
	gulp.src('src/js/**/*.js')
		.pipe(plumber({
			errorHandler: notify.onError(function (err) {
				return {
					title: 'js',
					message: err.message
				};
			})
		}))
		.pipe(concatJS('common.min.js'))
		.pipe(uglify())
		.pipe(gulp.dest('dist/js'))
		.pipe(browserSync.reload({stream: true}))
});

/*pug*/
gulp.task('pug', function () {
	return gulp.src(['!src/layout.pug', 'src/**/*.pug'])
		.pipe(plumber({
			errorHandler: notify.onError(function (err) {
				return {
					title: 'pug',
					message: err.message
				};
			})
		}))
		.pipe(pug())
		.pipe(gulp.dest('dist'))
		.pipe(browserSync.reload({stream: true}))
});

/*img*/
gulp.task('imagemin', function () {
	gulp.src('src/img/*')
		.pipe(imagemin())
		.pipe(gulp.dest('dist/img'))
		.pipe(browserSync.reload({stream: true}))
});

gulp.task('imgdest', function () {
	gulp.src('src/img/*')
		.pipe(gulp.dest('dist/img'))
});

/*browser-sync*/
gulp.task('browser-sync', function () {
	browserSync({
		server: {
			baseDir: 'dist'
		},
		notify: false
	});
});

/*build*/
gulp.task('build', [ 'uncss', 'imagemin'], function () {

});


gulp.task('watch', ['clean',  'browser-sync', 'pug', 'stylus', 'libs-css', 'libs-js', 'common-min-js', 'jquery-libs', 'fontsdest', 'imgdest'], function () {
	gulp.watch('src/styl/**/*.styl', ['stylus']);
	gulp.watch('src/**/*.pug', ['pug']);
	gulp.watch('src/libs/css/**/*.css', ['libs-css']);
	gulp.watch('src/libs/**/*.js', ['libs-js']);
	gulp.watch('src/js/**/*.js', ['common-min-js']);
	gulp.watch('src/img/*', ['imgdest']);
	gulp.watch('src/fonts/*', ['fontsdest']);
});