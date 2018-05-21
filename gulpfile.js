var gulp = require('gulp');
var rename = require('gulp-rename');

var config = {
  cssFile: 'ckanext/bart_theme/fanstatic/bart_theme.css',
  targetFolder: '../ckanext-bart_data_explorer/ckanext/bart_data_explorer/public/css'
};

// copy bart_theme.css to bart_data_explorer for local debugging
gulp.task('copy-css', function() {
  return gulp.src(config.cssFile)
    .pipe(rename('bart_theme_copy.css'))
    .pipe(gulp.dest(config.targetFolder));
});

// watch for css file for changes, and run copy-css
gulp.task('watch', function() {
  gulp.watch(config.cssFile, ['copy-css']);
});

gulp.task('default', [ 'copy-css', 'watch' ]);
