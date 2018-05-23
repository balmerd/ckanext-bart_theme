var gulp = require('gulp');
var rename = require('gulp-rename');

var config = {
  source: 'ckanext/bart_theme/fanstatic/',
  jsTarget: '../bart_redesign/',
  cssTargets: [
    '../bart_redesign/',
    '../ckanext-bart_data_explorer/ckanext/bart_data_explorer/public/css'
  ]
};

// copy bart_theme.js to bart_redesign for local debugging
gulp.task('copy-js', function() {
  return gulp.src(config.source + 'bart_theme.js')
    .pipe(rename('bart_theme_copy.js'))
    .pipe(gulp.dest(config.jsTarget));
});

// copy bart_theme.css to bart_data_explorer and bart_redesign for local debugging
gulp.task('copy-css', function() {
  return gulp.src(config.source + 'bart_theme.css')
    .pipe(rename('bart_theme_copy.css'))
    .pipe(gulp.dest(config.cssTargets[0]))
    .pipe(gulp.dest(config.cssTargets[1]));
});

// watch for css file for changes, and run copy-css
gulp.task('watch', function() {
  gulp.watch(config.source + 'bart_theme.js', ['copy-js']);
  gulp.watch(config.source + 'bart_theme.css', ['copy-css']);
});

gulp.task('default', [ 'watch', 'copy-js', 'copy-css' ]);
