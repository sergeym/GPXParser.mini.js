import gulp from 'gulp';
import minify from 'gulp-minify';
import jsdoc from 'gulp-jsdoc3';
import mocha from 'gulp-mocha';

gulp.task('test', function() {
    return gulp.src('./test/test.js', {read: false}).pipe(mocha({reporter: 'nyan'}))
});

gulp.task('minify', function(){
    return gulp.src('./src/GPXParser.js')
    .pipe(minify({
        ext:{
            min:'.min.js'
        },
        noSource: true
      }))
    .pipe(gulp.dest('./dist'));
});

gulp.task('doc', async function (cb) {
    const { default: config } = await import('./jsdoc.json', { with: { type: 'json' } });

    return gulp.src(['README.md', './src/GPXParser.js'], {read: false}).pipe(jsdoc(config, cb));
});

gulp.task('build', gulp.series('test', 'minify', 'doc'));