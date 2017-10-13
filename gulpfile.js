let gulp = require('gulp');
let concat = require('gulp-concat');
let uglify = require('gulp-uglify');
let babel = require('gulp-babel');
let rename = require('gulp-rename');
let cleancss = require('gulp-clean-css');
let util = require('gulp-util');


gulp.task("concatScripts", function() {
	return gulp.src([
		'./src/js/jquery-3.2.1.min.js',
		'./src/js/functions.js',
		'./src/js/io.js'])
		.pipe(concat('bundle.js'))
		.pipe(gulp.dest('./'));
});

gulp.task("minifyScripts", ["concatScripts"], function() {
	gulp.src("./bundle.js")
		.pipe(babel({
			presets: ['es2015']
		}))
		.pipe(uglify())
		.on('error', (err) => { util.log(util.colors.red('[Error]'), err.toString()); })
		.pipe(rename('bundle.min.js'))
		.pipe(gulp.dest('./'));
});

gulp.task("minifyCSS", function() {
	gulp.src('./src/css/*.css')
		.pipe(cleancss())
		.pipe(rename('style.min.css'))
		.pipe(gulp.dest('./src/css'));
});

gulp.task("build",["concatScripts", "minifyScripts", "minifyCSS"]);